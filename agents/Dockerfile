FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for OCR if needed
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ .

# Set PYTHONPATH to include the current directory so modules can be imported
ENV PYTHONPATH=/app

CMD ["python", "main.py"]
