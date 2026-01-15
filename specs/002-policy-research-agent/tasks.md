# Tasks: Policy Research Agent

**Feature Branch**: `002-policy-research-agent`
**Status**: Planned

## Phase 1: Setup
**Goal**: Initialize project structure and environment for the new feature.

- [X] T001 Create feature directory structure for backend module `backend/src/modules/policy-research`
- [X] T002 Create feature directory structure for agent package `agents/src/policy_research_agent`
- [X] T003 Update `backend/.env.example` with `TAVILY_API_KEY`, `TEMPORAL_HOST`, `MINIO_CONFIG`
- [X] T004 Update `agents/requirements.txt` to include `langgraph`, `langchain`, `pypdf`, `tavily-python`, `html2text`
- [X] T005 [P] Create empty `backend/src/modules/policy-research/policy-research.module.ts` to register the new module

## Phase 2: Foundational
**Goal**: Implement data models and core backend services.

- [X] T006 [P] Create `Allowlist` entity in `backend/src/modules/policy-research/entities/allowlist.entity.ts`
- [X] T007 [P] Create `ResearchJob` entity in `backend/src/modules/policy-research/entities/research-job.entity.ts`
- [X] T008 [P] Create `DraftPolicy` entity in `backend/src/modules/policy-research/entities/draft-policy.entity.ts`
- [ ] T009 Create migration script for new entities in `backend/src/migrations/`
- [X] T010 Implement `AllowlistService` in `backend/src/modules/policy-research/services/allowlist.service.ts`
- [X] T011 Implement `AllowlistController` in `backend/src/modules/policy-research/controllers/allowlist.controller.ts` with CRUD endpoints

## Phase 3: User Story 1 - Policy Drafting from Query
**Goal**: Implement the core agentic research loop and job execution.
**Independent Test**: Submit a job via API and verify a `DraftPolicy` is created with content.

- [X] T012 [P] [US1] Implement `ResearchJobService` in `backend/src/modules/policy-research/services/research-job.service.ts` to manage job creation
- [X] T013 [US1] Implement `ResearchJobController` in `backend/src/modules/policy-research/controllers/research-job.controller.ts` for job submission
- [X] T014 [US1] Create Temporal workflow definition `ResearchWorkflow` in `agents/src/policy_research_agent/workflows.py`
- [X] T015 [US1] Implement search tool using Tavily in `agents/src/policy_research_agent/tools.py`
- [X] T016 [US1] Implement web scraper using `AsyncHtmlLoader` in `agents/src/policy_research_agent/tools.py`
- [X] T017 [US1] Implement PDF loader using `PyPDFLoader` in `agents/src/policy_research_agent/tools.py`
- [X] T018 [US1] Define LangGraph state and nodes in `agents/src/policy_research_agent/graph.py`
- [X] T019 [US1] Implement `draft_policy` generation logic (LLM call) in `agents/src/policy_research_agent/graph.py`
- [ ] T020 [US1] Connect Temporal worker to `ResearchWorkflow` in `agents/src/main.py`
- [X] T021 [US1] Integrate backend to trigger Temporal workflow in `backend/src/modules/policy-research/services/research-job.service.ts`

## Phase 4: User Story 2 - Source Verification & Confidence
**Goal**: Ensure drafts have citations and confidence scores.
**Independent Test**: Verify `source_bundle` and `confidence_score` are present in the output.

- [X] T022 [P] [US2] Update `DraftPolicy` entity/DTO to strictly validate `source_bundle` structure in `backend/src/modules/policy-research/entities/draft-policy.entity.ts`
- [X] T023 [US2] Implement confidence scoring logic in agent (per rule) in `agents/src/policy_research_agent/graph.py`
- [X] T024 [US2] Implement citation extraction and bundling logic in `agents/src/policy_research_agent/graph.py`
- [X] T025 [US2] Add endpoint `GET /admin/research/jobs/:id/draft` to `ResearchJobController` to view detailed results

## Phase 5: User Story 3 - Safety & Allowlist Enforcement
**Goal**: Enforce domain restrictions to prevent hallucinations/unsafe crawling.
**Independent Test**: Attempt to crawl a disallowed domain and verify the agent rejects it.

- [X] T026 [US3] Implement `check_allowlist` activity/tool in `agents/src/policy_research_agent/tools.py`
- [X] T027 [US3] Connect Agent to Backend DB (or pass allowlist as workflow arg) to fetch allowed domains in `agents/src/policy_research_agent/workflows.py`
- [X] T028 [US3] Add validation step in LangGraph to filter search results against allowlist in `agents/src/policy_research_agent/graph.py`
- [X] T029 [US3] Implement strict error handling for blocked domains in `agents/src/policy_research_agent/graph.py`

## Final Phase: Polish & Cross-Cutting
**Goal**: Final cleanup, documentation, and end-to-end verification.

- [X] T030 Add unit tests for `AllowlistService` in `backend/src/modules/policy-research/services/allowlist.service.spec.ts`
- [X] T031 Add unit tests for Agent graph nodes in `agents/tests/test_policy_research_agent.py`
- [X] T032 Update API documentation (Swagger) in `backend/src/main.ts` (or module decorator)
- [X] T033 Verify end-to-end flow with a real "Trade License" query
- [X] T034 cleanup temporary dev scripts or fixtures

## Dependencies

1. **Phase 1 (Setup)** must be completed first.
2. **Phase 2 (Foundational)** blocks all User Stories.
3. **Phase 3 (US1)** is the MVP and blocks US2 and US3.
4. **Phase 4 (US2)** and **Phase 5 (US3)** can be done in parallel after Phase 3, but US3 (Safety) is recommended before production release.

## Implementation Strategy

- **MVP**: Complete Phases 1, 2, and 3. This gives a functional "happy path" where an Admin can request a policy and get a draft.
- **Safety**: Phase 5 is critical for preventing "hallucinations" and should be prioritized if the agent is allowed to search the open web.
- **Refinement**: Phase 4 adds the necessary trust layer for human review.

## Parallel Execution Opportunities

- **Backend vs Agents**: Tasks in Phase 2 (Backend Entities) can be done in parallel with preliminary Agent tool implementation (Phase 3 T015-T017).
- **US2 vs US3**: Once the core graph is working (Phase 3), one developer can work on Confidence/Citations (US2) while another works on Allowlist enforcement (US3).
