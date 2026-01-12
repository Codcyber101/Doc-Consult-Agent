# GovAssist Ethiopia (GAE) - Architecture & System Design

## Overview
GAE is a multi-agent system designed to guide Ethiopian citizens through bureaucratic processes with deterministic compliance and AI-assisted document intelligence.

## Component Design
- **NestJS (Backend)**: Orchestrates the business logic, manages the Policy Registry, and integrates with Temporal for long-running workflows.
- **FastAPI (Agents)**: Hosts specialized intelligence agents for OCR (Tesseract) and Compliance (Drools-like logic).
- **Next.js (Frontend)**: A PWA that provides an offline-first wizard interface for users.
- **Temporal**: Ensures that document processing and government submissions are durable and auditable.

## Security & Privacy
- **Sovereign Storage**: Documents are stored in local MinIO instances.
- **PII Masking**: Agents are designed to work on anonymized text whenever possible.
- **Audit Log**: Every decision is logged with metadata for non-repudiation.

## Data Model
See `specs/001-govassist-ethiopia/data-model.md` for entity relationships.
