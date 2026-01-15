# Sovereign Deployment Guide

This guide details the steps to deploy GovAssist Ethiopia (GAE) in a sovereign, PDPP-compliant environment.

## 1. System Requirements

### Hardware
- **CPU**: 8+ Cores (ARM64 or x86_64)
- **RAM**: 32GB+ (to support agent ensemble and vector store)
- **Storage**: 500GB+ NVMe (for MinIO and Postgres)
- **GPU**: NVIDIA T4 or better (Recommended for Tesseract fine-tuning and local LLMs)

### Software
- Docker Engine 24+ & Docker Compose v2
- Node.js 20.x
- Python 3.11.x
- Tesseract OCR v5 (with Amharic training data)

## 2. Fast Track (Docker Compose)

The entire ensemble can be started using the integrated compose file in the `infra/` directory.

```bash
# Clone and enter directory
git clone https://github.com/govassist-ethiopia/gae-core.git
cd gae-core/infra

# Set environment variables
cp .env.example .env
# Edit .env with your HSM keys and local URLs

# Start services
docker-compose up -d
```

## 3. Sovereign Zone Configuration

### PII Security (MinIO)
Ensure MinIO is not accessible via public internet. Configure bucket policies to restrict access only to the `backend` and `agents` network.

### Signing (HSM)
Configure the `Signer` in `agents/src/common/signing.py` to point to your hardware security module or local KMS instance.

### Audit Anchoring
The `AuditAgent` creates Merkle roots daily. Ensure these are mirrored to an immutable off-site backup or a private blockchain node for maximum non-repudiation.

## 4. Troubleshooting

- **Offline Sync Issues**: Verify that the `PouchDB` client in the UI can reach the `CouchDB` sync gateway.
- **OCR Latency**: Ensure the Tesseract container has sufficient CPU allocation. Amharic script processing is CPU-intensive.
- **Workflow Failures**: Check the Temporal UI (default port 8080) to inspect stalled or failed document processing activities.
