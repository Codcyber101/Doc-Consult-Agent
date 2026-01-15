# Research & Technical Decisions: GovAssist Ethiopia (GAE)

**Feature**: GovAssist Ethiopia (GAE) Platform
**Status**: Complete
**Method**: PRD Analysis & Extraction

## Technical Stack Decisions

### Frontend
- **Decision**: Next.js + React (PWA) + Tailwind CSS
- **Rationale**: Next.js provides server-side rendering for SEO and performance. PWA capabilities are essential for offline-first requirements. Tailwind CSS ensures rapid and consistent styling.
- **Alternatives**: Pure React (lacks SSR/SEO benefits needed for public docs), Angular (steeper learning curve, less flexible for this specific PWA need).

### Backend
- **Decision**: Hybrid Microservices (NestJS + FastAPI)
    - **NestJS (Node.js/TypeScript)**: For API gateway, business logic, workflow orchestration, and admin console. Strong typing and structure align with "Code Quality" constitution principle.
    - **FastAPI (Python)**: For AI/ML agents (OCR, RAG, Compliance) to leverage Python's rich ecosystem (HuggingFace, PyTorch, LangChain).
- **Rationale**: Best tool for the job. TypeScript for robust application logic; Python for data science/AI heavy lifting.

### Orchestration & State
- **Decision**: Temporal + LangGraph + BullMQ
    - **Temporal**: For durable, long-running workflows (human-in-the-loop, multi-day bureaucratic processes). Ensures state is never lost.
    - **LangGraph**: For complex agentic decision-making and state transitions within AI tasks.
    - **BullMQ**: For handling high-throughput, short-lived jobs and buffering inputs.
- **Rationale**: Separation of concerns. Temporal handles "process reliability", LangGraph handles "cognitive reliability", BullMQ handles "throughput".

### Database & Storage
- **Decision**: PostgreSQL + MinIO + PouchDB/CouchDB
    - **PostgreSQL**: Primary relational store for metadata, users, and policy registry.
    - **MinIO**: S3-compatible object storage for sovereign PII/Document storage.
    - **PouchDB/CouchDB**: For offline-first synchronization to client devices.
    - **Weaviate**: Vector database for RAG (Regulation Expert).
- **Rationale**: Postgres is the standard for reliability. MinIO allows self-hosted "cloud-like" storage. PouchDB is the industry standard for robust offline-sync.

### Testing
- **Decision**: Jest (TS) + Pytest (Python) + Cypress (E2E)
- **Rationale**: Industry standards for respective languages. Align with "Comprehensive Testing Standards" constitution principle.

## Resolved Clarifications

| Topic | Question | Resolution |
|-------|----------|------------|
| Vector DB | Weaviate or Milvus? | Selected **Weaviate** for its strong module ecosystem and hybrid search capabilities which fit the "Regulation Expert" need. |
| Auth | Identity Provider? | **Keycloak** will be used for OIDC management, with a mock Fayda bridge initially as per PRD. |
| OCR | Fallback strategy? | **Tesseract v5** (local) as primary, falling back to a **Vision LLM** (cloud/masked) only when local confidence is low. |
