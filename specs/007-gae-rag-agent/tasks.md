# Tasks: GAE RAG Agent (Intelligence Plane)

**Feature**: GAE RAG Agent  
**Status**: Initialized  
**Priority**: P1 (Sovereign Intelligence)  
**User Story Dependencies**: US1 -> US2 -> US3

## Implementation Strategy

The GAE RAG Agent will be implemented following an MVP-first strategy, prioritizing the Policy Research Agent (US1) as the data seed, followed by the Regulation Expert (US2) for user guidance, and finally the Citation Auditing/Safety layer (US3) for production hardening. We use a hybrid Python/Node.js stack to leverage ML libraries while maintaining a robust orchestration API.

## Phase 1: Setup (Infrastructure & Environments)

Goal: Initialize the multi-service environment and developer tools.

- [x] T001 Initialize infrastructure services (Weaviate, Postgres, MinIO) in `infra/docker-compose.yml`
- [x] T002 Setup Python virtual environment and dependencies in `agents/requirements.txt`
- [x] T003 Setup Node.js backend project and dependencies in `backend/package.json`
- [x] T004 Create base directory structure for agents in `agents/` and backend in `backend/src/`

## Phase 2: Foundational (Schemas & Common Utilities)

Goal: Establish the shared data models and safety layers required by all user stories.

- [x] T005 Implement PostgreSQL schemas for `PolicyDraft`, `RegulationSnippet`, `SourceBundle`, and `Citation` in `backend/src/models/`
- [x] T006 Initialize Weaviate schema (classes and properties) for `RegulationSnippet` in `agents/common/storage.py`
- [x] T007 [P] Implement base PII Masking logic (Safety Agent) in `agents/common/safety.py`
- [x] T008 [P] Implement Citation Auditor validation logic in `agents/common/citation.py`
- [x] T009 [P] Implement unit tests for foundational safety and citation logic in `agents/tests/test_common.py`

## Phase 3: [US1] Policy Research & Drafting (Priority: P1)

Goal: Enable automated research and YAML generation for the Policy Registry.

**Independent Test**: Trigger a research job via API and verify a valid Policy YAML is stored in the database.

- [x] T010 [US1] Implement web crawler with domain allowlist (FR-002) and PDF extraction in `agents/policy_research_agent/tools.py`
- [x] T011 [US1] Define LangGraph research flow (Search -> Extract -> Validate) in `agents/policy_research_agent/graph.py`
- [x] T012 [US1] Implement YAML generation with legal hierarchy prioritization (FR-009) and schema validation in `agents/policy_research_agent/workflows.py`
- [x] T013 [US1] Implement unit tests for PRA orchestration and YAML validation in `agents/tests/test_pra.py`
- [x] T014 [P] [US1] Create Backend controller for research job submission in `backend/src/api/controllers/research.controller.ts`
- [x] T015 [US1] Implement Temporal workflow for research orchestration in `backend/src/workflows/research.workflow.ts`

## Phase 4: [US2] Regulation Guidance (RAG) (Priority: P2)

Goal: Provide citizens with natural-language guidance backed by legal citations.

**Independent Test**: Query the guidance endpoint and receive a summarized answer with at least one verified citation.

- [x] T016 [US2] Implement hybrid search logic (Weaviate BM25 + Vector) in `agents/regulation_expert/retrieval.py`
- [x] T017 [US2] Implement masked LLM summarization logic in `agents/regulation_expert/summarization.py`
- [x] T018 [US2] Implement unit tests for RAG retrieval and summarization in `agents/tests/test_rag.py`
- [x] T019 [P] [US2] Create Backend controller for guidance queries in `backend/src/api/controllers/guidance.controller.ts`
- [x] T020 [US2] Integrate Safety Agent masking into the RAG flow in `agents/regulation_expert/summarization.py`

## Phase 5: [US3] Citation Auditing & Safety (Priority: P3)

Goal: Hardening the system with strict citation checks and safety audits.

**Independent Test**: Verify that RAG responses with low confidence are escalated to human review and PII is audited.

- [x] T021 [US3] Implement confidence-based escalation logic (threshold 0.70) in `backend/src/workflows/guidance.workflow.ts`
- [x] T022 [US3] Integrate Citation Auditor "Self-Correction" loop into RAG generation in `agents/regulation_expert/summarization.py`
- [x] T023 [US3] Implement safety audit logging for masked LLM calls in `agents/common/safety.py`
- [x] T024 [US3] Implement unit tests for audit logging and escalation triggers in `agents/tests/test_audit.py`
- [x] T025 [P] [US3] Create audit event emission logic for Kafka in `backend/src/services/audit.service.ts`

## Phase 6: Polish & Cross-Cutting Concerns

Goal: Final refinement for production readiness.

- [x] T026 Refine Amharic-specific error messages in `backend/src/api/middleware/error.handler.ts`
- [x] T027 Implement performance monitoring (latency tracking) for RAG steps in `backend/src/api/middleware/metrics.ts`
- [x] T028 Finalize `specs/007-gae-rag-agent/quickstart.md` with verified example commands
- [x] T029 Run full end-to-end integration tests in `tests/e2e/rag-agent.cy.ts`
- [x] T030 Perform final performance budget validation against SC-002 in `backend/tests/performance/rag_benchmark.ts`

## Parallel Execution Opportunities

- **T007**, **T008**, and **T009** (Safety, Citation logic, and Common Tests) can be developed in parallel.
- **T014** (Research Controller) can be developed alongside **T010-T012** (Agent logic).
- **T019** (Guidance Controller) can be developed alongside **T016-T017** (RAG logic).
- **T025** (Audit service) can be developed independently once foundational schemas are ready.