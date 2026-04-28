<div align="center">

# 🔍 MF-Audit-AI

### AI-Powered Bias Detection & Algorithmic Fairness Auditor

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0.3-lightgrey?logo=flask)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-orange?logo=google)](https://ai.google.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**FairLens AI** is a full-stack web application that uses Google Gemini to detect bias, discrimination, and unfairness in HR datasets, hiring data, and company policy documents.

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **Document Audit** | Upload CSV, XLSX, PDF, DOCX, or TXT files for instant AI analysis |
| ⚖️ **Policy vs. Data Check** | Cross-reference your company policy against actual hiring data |
| 📊 **Fairness Score** | Get a 0–100 fairness score with risk level (Low / Moderate / High / Critical) |
| 🔍 **Bias Type Detection** | Identifies Gender, Age, Regional, Income, and other bias types |
| 💡 **Actionable Recommendations** | Receive specific, practical steps to fix detected bias |
| 🔁 **Model Fallback** | Automatically retries across multiple Gemini models for reliability |

---

## 🏗️ Project Structure

```
fairlens_AI/
├── backend/                  # Python Flask API
│   ├── app.py                # Main Flask application
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example          # Environment variable template
│   └── uploads/              # Temporary file uploads (git-ignored)
│
└── fairlens-ai-audit/        # React + Vite Frontend
    ├── src/
    │   ├── App.tsx            # Root component
    │   ├── components/        # UI components
    │   ├── lib/               # Utilities and API helpers
    │   └── types.ts           # TypeScript type definitions
    ├── package.json
    └── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+** — [Download](https://python.org/downloads)
- **Node.js 18+** — [Download](https://nodejs.org)
- **Google Gemini API Key** — [Get one free](https://aistudio.google.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/fairlens-ai.git
cd fairlens-ai
```

---

### 2. Backend Setup (Flask)

```bash
cd backend

# Create and activate a virtual environment (recommended)
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
```

Open `.env` and add your Gemini API key:

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
FLASK_APP=app.py
FLASK_ENV=development
PORT=5000
```

Start the backend server:

```bash
python app.py
```

The API will be running at **`http://localhost:5000`**

---

### 3. Frontend Setup (React + Vite)

```bash
cd fairlens-ai-audit

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running at **`http://localhost:3000`**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check — confirms Gemini is configured |
| `POST` | `/upload-analyze` | Analyze a single file (dataset or policy) |
| `POST` | `/combined-analyze` | Cross-analyze dataset + policy document together |

### Example: Single File Analysis

```bash
curl -X POST http://localhost:5000/upload-analyze \
  -F "file=@hiring_data.csv" \
  -F "context=dataset"
```

### Example Response

```json
{
  "biased": true,
  "fairness_score": 42,
  "risk_level": "High",
  "bias_types": ["Gender Bias", "Age Discrimination"],
  "summary": "Women are hired at a 38% lower rate than men in engineering roles.",
  "recommendations": [
    "Anonymize resumes during initial screening",
    "Implement structured interviews with standardized scoring"
  ]
}
```

---

## 🧠 Supported File Types

| Format | Type |
|---|---|
| `.csv` | Hiring/HR datasets |
| `.xlsx` / `.xls` | Excel spreadsheets |
| `.pdf` | Policy documents, reports |
| `.docx` | Word documents |
| `.txt` | Plain text policies |

---

## 🛡️ Security Notes

- **Never commit your `.env` file.** It is listed in `.gitignore`.
- The `uploads/` folder is also git-ignored to prevent accidental data leaks.
- Always use a virtual environment to isolate Python dependencies.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Built with ❤️ using <strong>Google Gemini AI</strong> · <strong>Flask</strong> · <strong>React</strong>
</div>
