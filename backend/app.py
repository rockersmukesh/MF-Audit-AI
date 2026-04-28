import os
import io
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
import PyPDF2
from docx import Document

# Load environment variables (GEMINI_API_KEY)
load_dotenv()

app = Flask(__name__)
# Enable CORS for the React frontend running on Vite
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024  # 32 MB limit

# Pydantic schema enforcing structured Gemini Output natively
class BiasReport(BaseModel):
    biased: bool = Field(description="True if the dataset or text contains significant bias, discrimination, or unfair patterns")
    fairness_score: int = Field(description="An integer score from 0 to 100 where 100 is perfectly fair")
    risk_level: str = Field(description="Must be 'Low', 'Moderate', 'High', or 'Critical'")
    bias_types: list[str] = Field(description="List of detected bias types, e.g. ['Gender Bias', 'Age Bias']")
    summary: str = Field(description="A concise summary explaining why bias was detected or why it is fair.")
    recommendations: list[str] = Field(description="A list of actionable recommendations to fix the data or policy.")

client = None
if os.environ.get("GEMINI_API_KEY"):
    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'xls', 'pdf', 'docx', 'txt'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_file(file, filename):
    """
    Parses structural or textual files and returns a large markdown or text chunk 
    to be fed directly to the LLM.
    """
    ext = filename.rsplit('.', 1)[1].lower()
    file_stream = file.read()
    
    if ext == 'csv':
        df = pd.read_csv(io.BytesIO(file_stream))
        return _pandas_to_prompt_context(df, ext)
    elif ext in ['xlsx', 'xls']:
        df = pd.read_excel(io.BytesIO(file_stream))
        return _pandas_to_prompt_context(df, ext)
    elif ext == 'txt':
        return file_stream.decode('utf-8', errors='ignore')
    elif ext == 'pdf':
        reader = PyPDF2.PdfReader(io.BytesIO(file_stream))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    elif ext == 'docx':
        doc = Document(io.BytesIO(file_stream))
        text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        return text
    return ""

def _pandas_to_prompt_context(df, format_type):
    """
    Converts a dataset to a textual prompt payload describing rules, limits, and sample data.
    """
    shape_str = f"Dataset size: {len(df)} rows, {len(df.columns)} columns.\n"
    columns_str = f"Columns: {', '.join(df.columns)}.\n"
    missing_str = f"Missing Values:\n{df.isnull().sum().to_string()}\n"
    
    # Dump a sample of the data for the LLM to understand contextual values
    # Try to take a balanced sample if possible, otherwise just top and bottom
    sample_size = min(50, len(df))
    sample_df = df.sample(n=sample_size, random_state=42) if len(df) > sample_size else df
    data_str = f"Sample Data ({sample_size} records):\n{sample_df.to_string(index=False)}\n"
    
    return f"Structured {format_type.upper()} Dataset Metadata:\n{shape_str}{columns_str}\n{missing_str}\n\n{data_str}"

@app.route('/health', methods=['GET'])
def health_check():
    if not client:
        return jsonify({'status': 'running', 'gemini': 'missing_api_key'}), 200
    return jsonify({'status': 'running', 'gemini': 'configured'}), 200

@app.route('/upload-analyze', methods=['POST'])
def analyze_file():
    if not client:
        return jsonify({'error': 'Gemini API Key is not configured on the server.'}), 500
        
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        try:
            document_content = extract_text_from_file(file, filename)
            
            # Use context hint from the frontend to tailor the prompt
            context = request.form.get('context', 'dataset')
            
            if context == 'policy':
                analysis_focus = """
- Discriminatory or exclusionary language in hiring, lending, or healthcare rules
- Phrases that act as proxy for protected characteristics (e.g., "must be energetic" for age)
- Unfair screening criteria that disproportionately eliminate minority groups
- Ethical risks in written decision-making frameworks
- Missing diversity or accessibility provisions"""
            else:
                analysis_focus = """
- Gender imbalance in selection, approval, or outcome rates
- Age discrimination patterns in acceptance criteria
- Regional or location-based disparities in decisions
- Income or socioeconomic bias in approval thresholds
- Hidden correlation between sensitive attributes and negative outcomes"""

            prompt = f"""
            You are FairLens AI, an expert AI auditor specializing in ethical AI, bias detection, and algorithmic fairness.
            I will provide you with a {"policy document" if context == "policy" else "structured dataset summary"} to analyze.
            
            Your job is to carefully inspect this content for:{analysis_focus}
            
            Be concise but thorough. Base your analysis strictly on the content provided.
            
            Here is the {"Document" if context == "policy" else "Dataset"} Content:
            {document_content}
            """
            
            # Try models in priority order — confirmed via ListModels API
            models_to_try = [
                'gemini-2.5-flash',       # Best quality, may have demand spikes
                'gemini-2.0-flash-lite',  # Fast and stable fallback
                'gemini-2.0-flash-001',   # Stable versioned snapshot
            ]
            response = None
            last_error = None
            
            for model_name in models_to_try:
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=prompt,
                        config=types.GenerateContentConfig(
                            response_mime_type="application/json",
                            response_schema=BiasReport,
                            temperature=0.1
                        ),
                    )
                    break # Success, exit retry loop
                except Exception as e:
                    last_error = str(e)
                    # Retry on both 503 (high demand) and 404 (deprecated/unavailable model)
                    if '503' in last_error or '404' in last_error or 'demand' in last_error.lower() or 'no longer available' in last_error.lower():
                        continue # Try next model
                    else:
                        break # Other error, don't retry models
            
            if not response:
                if last_error and ('503' in last_error or 'demand' in last_error.lower()):
                    return jsonify({'error': 'All AI models are currently experiencing high demand. Please try again in a few minutes.'}), 503
                raise Exception(f"AI Analysis Failed: {last_error}")
                
            return response.text, 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
            
    return jsonify({'error': 'File type not allowed'}), 400

# Optional alias just in case
@app.route('/analyze-text', methods=['POST'])
def analyze_text_alias():
    return analyze_file()


@app.route('/combined-analyze', methods=['POST'])
def combined_analyze():
    """
    Accepts a dataset file AND a policy document.
    Gemini checks whether the dataset violates the company's own stated policies.
    """
    if not client:
        return jsonify({'error': 'Gemini API Key is not configured on the server.'}), 500

    if 'dataset' not in request.files:
        return jsonify({'error': 'Dataset file is required.'}), 400

    dataset_file = request.files['dataset']
    policy_file = request.files.get('policy')  # Optional

    if not allowed_file(dataset_file.filename):
        return jsonify({'error': 'Dataset file type not allowed.'}), 400
    if policy_file and not allowed_file(policy_file.filename):
        return jsonify({'error': 'Policy file type not allowed.'}), 400

    try:
        dataset_content = extract_text_from_file(dataset_file, secure_filename(dataset_file.filename))
        policy_content = extract_text_from_file(policy_file, secure_filename(policy_file.filename)) if policy_file else None

        if policy_content:
            prompt = f"""
            You are FairLens AI, an expert compliance auditor specializing in ethical AI and algorithmic fairness.

            You are given TWO documents:
            1. A company POLICY DOCUMENT that defines the organization's stated rules, commitments, and fairness standards.
            2. An actual DATA DATASET showing real hiring, lending, or decision outcomes.

            Your task:
            - Read the policy carefully and extract the fairness commitments, anti-discrimination rules, and equity standards it mentions.
            - Analyze the dataset to see if the actual outcomes CONTRADICT or VIOLATE those stated policies.
            - Identify any gaps between what the policy promises and what the data reveals.
            - Flag hypocrisy: e.g., policy says "we do not discriminate by gender" but data shows women are hired 40% less often.

            Be specific. Cite patterns from the data that contradict specific policy clauses.

            ===== COMPANY POLICY DOCUMENT =====
            {policy_content}

            ===== DATASET SUMMARY =====
            {dataset_content}
            """
        else:
            # Fallback if only dataset was provided via this endpoint
            prompt = f"""
            You are FairLens AI, an expert AI auditor specializing in bias detection and algorithmic fairness.
            Analyze this dataset for demographic bias, selection imbalances, and unfair patterns.

            ===== DATASET SUMMARY =====
            {dataset_content}
            """

        models_to_try = [
            'gemini-2.5-flash',
            'gemini-2.0-flash-lite',
            'gemini-2.0-flash-001',
        ]
        response = None
        last_error = None

        for model_name in models_to_try:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_mime_type="application/json",
                        response_schema=BiasReport,
                        temperature=0.1
                    ),
                )
                break
            except Exception as e:
                last_error = str(e)
                retryable = (
                    '503' in last_error or '404' in last_error or
                    '429' in last_error or 'demand' in last_error.lower() or
                    'no longer available' in last_error.lower() or
                    'quota' in last_error.lower()
                )
                if retryable:
                    continue
                else:
                    break

        if not response:
            if last_error and '429' in last_error:
                return jsonify({'error': 'Gemini API free tier quota exhausted. Please try again later or enable billing.'}), 429
            raise Exception(f"AI Analysis Failed: {last_error}")

        return response.text, 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':

    app.run(debug=True, port=5000)
