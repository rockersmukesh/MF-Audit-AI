# ─── Build Stage ─────────────────────────────────────────────
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy app source
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Cloud Run sets PORT env var automatically (default 8080)
ENV PORT=8080
ENV FLASK_ENV=production

EXPOSE 8080

# Run with gunicorn for production
CMD exec gunicorn --bind :$PORT --workers 2 --threads 4 --timeout 120 app:app
