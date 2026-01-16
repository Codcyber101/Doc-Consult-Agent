# Quickstart: GAE RAG Agent

## Prerequisites
- Python 3.11+
- Node.js 20+
- Docker & Docker Compose (for Weaviate and Postgres)

## Setup
1. **Initialize Infrastructure**:
   ```bash
   docker-compose -f infra/docker-compose.yml up -d weaviate postgres minio
   ```

2. **Agent Setup (Python)**:
   ```bash
   cd agents
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Backend Setup (Node.js)**:
   ```bash
   cd backend
   npm install
   ```

## Development Workflow

### 1. Research a New Policy (PRA)
To trigger the Policy Research Agent:
```bash
curl -X POST http://localhost:3000/v1/research/policy-draft \
     -H "Content-Type: application/json" \
     -d '{"query": "Trade license renewal Addis Ababa", "jurisdiction": "Addis Ababa"}'
```

### 2. Ask a Regulatory Question (RAG)
To query the Regulation Expert:
```bash
curl -X POST http://localhost:3000/v1/guidance/query \
     -H "Content-Type: application/json" \
     -d '{"question": "How long does it take to renew a trade license in Bole?"}'
```

### 3. Safety & Audit
All cloud LLM calls are masked by the Safety Agent. You can verify the masking logs:
```bash
tail -f agents/pii_audit.log
```

### 4. Amharic Error Support
The API returns localized error messages in Amharic:
```json
{
  "statusCode": 404,
  "message_am": "ይቅርታ፣ የጠየቁት መረጃ አልተገኘም። (Information not found)",
  "timestamp": "2026-01-16T..."
}
```

## Testing
- **Agent Tests**: `export PYTHONPATH=$PYTHONPATH:$(pwd)/agents/src && pytest agents/tests`
- **Backend Tests**: `npm test`
- **Citation Audit**: Run the citation verification logic in `agents/src/common/citation.py`.
