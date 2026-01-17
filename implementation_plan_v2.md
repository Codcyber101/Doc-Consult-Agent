# Comprehensive Implementation Plan: GovAssist Ethiopia Agents

**Status**: Planning
**Date**: 2026-01-17
**Based on**: `GovAssist Ethiopia (GAE) — Final, Detailed PRD & Technical Specification.md`

## 1. Gap Analysis
A review of the current `agents/src` directory reveals the following gaps against the "Final" PRD:

| Agent / Component | Status | Missing Features |
|-------------------|--------|------------------|
| **Cost Control Agent** | 🔴 Missing | Entire agent is missing. Needs to track token usage and enforce budget caps. |
| **Vision Router** | 🟡 Partial | Local Tesseract implemented. **Fallback to Vision LLM** is missing (currently just flags for escalation). |
| **Policy Research Agent** | 🟡 Partial | Core logic exists. **Real Search** (Allowlist) and **PDF Extraction** are mocked. |
| **Audit Agent** | 🟡 Partial | `log_event` is a print mock. Needs to write to Kafka/Storage. |
| **Human Review Agent** | 🟡 Partial | `submit_to_queue` is a print mock. Needs to call Backend API/DB. |
| **MESOB Connector** | 🟡 Partial | `submit_application` is a print mock. Needs real HTTP client logic. |
| **Safety Agent** | 🟢 Good | PII masking (Regex) is implemented. |
| **Regulation Expert** | 🟢 Good | Hybrid Retrieval (Weaviate) + Summarization (Groq) implemented. |
| **Compliance Agent** | 🟢 Good | Logic implemented (Groq). |

## 2. Implementation Phases

### Phase 1: Missing Core Components (Cost Control) (Completed)
### Phase 2: Vision & Research Intelligence (Completed)
### Phase 3: System Integration & Persistence (Completed)
### Phase 4: Verification (Completed)
### Phase 5: Procedural Guide (Completed)

## 3. Next Steps
Proceed with **Phase 1: Cost Control Agent** immediately.
