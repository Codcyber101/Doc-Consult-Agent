# Implementation Plan: GAE RAG Agent (Intelligence Plane)

**Branch**: `007-gae-rag-agent` | **Date**: 2026-01-16 | **Spec**: [specs/007-gae-rag-agent/spec.md]
**Input**: Feature specification from `/specs/007-gae-rag-agent/spec.md`

## Summary

The GAE RAG Agent is the intelligence core of GovAssist Ethiopia, responsible for regulatory research and providing natural-language guidance to users. It comprises two main components: the Policy Research Agent (PRA) for automated rule extraction into the Policy Registry, and the Regulation Expert (RAG) for answering citizen queries with verified citations. The approach utilizes hybrid search (BM25 + Vector) and a "Safety Agent" for PII masking, ensuring sovereign-first data handling and deterministic rule enforcement.

## Technical Context

**Language/Version**: Python 3.11 (Agent logic), TypeScript/Node.js (Orchestration/API)
**Primary Dependencies**: LangGraph, LangChain, Pydantic, FastAPI, Weaviate (Vector DB with native BM25), Tesseract (OCR)
**Storage**: Weaviate (Hybrid Search), PostgreSQL (Metadata), MinIO (PII Store)
**Testing**: Pytest (Agents), Jest (API/Workflows)
**Target Platform**: Kubernetes (Hybrid: Sovereign zone + Cloud compute)
**Project Type**: Multi-agent backend service
**Performance Goals**: RAG retrieval + summarization < 5s; 95% citation accuracy
**Constraints**: PII must be masked before cloud LLM calls; 0.70 confidence threshold for automated response
**Scale/Scope**: Initial pilot covers Federal + Addis Ababa jurisdictions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Code Quality & Consistency**: [PASS] Logic is split between Python (ML/Research) and Node.js (API), following established patterns.
- **Comprehensive Testing Standards**: [PASS] Mandatory citation auditing and safety audits are built into the requirements.
- **User Experience Consistency**: [PASS] Citations and confidence-based human escalation ensure transparency.
- **Performance & Efficiency**: [PASS] Caching and hybrid search strategy optimize for speed and accuracy.
- **Security & Compliance**: [PASS] Zero-trust masking and sovereign storage (MinIO) are prioritized.

## Project Structure

### Documentation (this feature)

```text
specs/007-gae-rag-agent/
├── plan.md              # Implementation plan
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # API and schema definitions
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
agents/
├── policy_research_agent/
│   ├── graph.py         # LangGraph research flow
│   ├── tools.py         # Web crawl and PDF extraction
│   └── workflows.py     # YAML generation
├── regulation_expert/
│   ├── retrieval.py     # Hybrid search logic
│   └── summarization.py # Masked LLM summarization
└── common/
    ├── safety.py        # PII masking agent
    └── citation.py      # Citation auditor logic

backend/
├── src/
│   ├── api/
│   │   └── controllers/ # RAG and PRA endpoints
│   ├── models/          # PolicyDraft and Citation entities
│   └── workflows/       # Temporal orchestrators
└── tests/
    ├── integration/
    └── unit/
```

**Structure Decision**: Option 2: Web application (Multi-agent backend service). Logic is split between `agents/` (Python/ML) and `backend/` (Node.js/Orchestration).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
