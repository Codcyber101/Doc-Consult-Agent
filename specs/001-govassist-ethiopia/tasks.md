---

description: "Task list template for feature implementation"
---

# Tasks: GovAssist Ethiopia (GAE)

**Input**: Design documents from `/specs/001-govassist-ethiopia/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Contracts**: `contracts/`
- **Backend**: `backend/src/`
- **Agents**: `agents/src/`
- **Frontend**: `ui/src/`
- **Policies**: `policy-registry/`
- **Infra**: `infra/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create repository directory structure as defined in plan.md
- [X] T002 Initialize NestJS backend project in backend/
- [X] T003 Initialize Next.js PWA project in ui/
- [X] T004 Initialize Python FastAPI agents project in agents/
- [X] T005 Create docker-compose.yml in infra/ with Postgres, MinIO, Redis, Temporal, Weaviate
- [X] T006 [P] Initialize contracts/openapi/public-api.yaml and contracts/schemas/
- [X] T007 [P] Initialize policy-registry/ directory structure with README

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 Setup TypeORM/Prisma with PostgreSQL in backend/
- [X] T009 Create database migrations for User, Policy, Playbook, Document entities in backend/src/migrations/
- [X] T010 Implement Auth module (Keycloak/Fayda Mock) in backend/src/modules/auth/
- [X] T011 Setup Temporal Client and Worker in backend/src/workflows/ (MOCKED)
- [X] T012 Setup Temporal Worker in agents/src/worker.py (MOCKED)
- [X] T013 Setup MinIO client service in backend/src/modules/storage/
- [X] T014 Setup PouchDB/CouchDB sync logic in ui/src/lib/offline/
- [X] T015 Implement basic logging and audit service in backend/src/modules/audit/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Trade License Renewal (Priority: P1) 🎯 MVP

**Goal**: Enable SMEs to find playbooks and check basic readiness.

**Independent Test**: User can browse "Renew Trade License" playbook and see requirements.

### Implementation for User Story 1

- [X] T016 [US1] Define Playbook schema in policy-registry/schemas/playbook.yaml
- [X] T017 [US1] Create trade-license.yaml playbook in policy-registry/addis-ababa/
- [X] T018 [US1] Implement Playbook Service to read/parse registry in backend/src/modules/playbook/
- [X] T019 [US1] Implement GET /playbooks endpoint in backend/src/api/controllers/playbook.controller.ts
- [X] T020 [US1] Create Playbook Viewer component in ui/src/components/playbook/PlaybookViewer.tsx
- [X] T021 [US1] Implement Wizard UI for "Renew Trade License" flow in ui/src/app/flows/trade-license/page.tsx
- [X] T022 [US1] Integrate PouchDB sync for Playbook data in ui/src/lib/offline/sync-playbooks.ts

**Checkpoint**: Users can view playbooks offline/online.

---

## Phase 4: User Story 2 - Document Analysis & Readiness (Priority: P2)

**Goal**: Upload documents, perform OCR/Compliance checks, get readiness score.

**Independent Test**: Upload a document and receive a JSON analysis result.

### Implementation for User Story 2

- [X] T023 [US2] Implement Document Upload API (Multipart) in backend/src/api/controllers/document.controller.ts
- [X] T024 [US2] Create Tesseract OCR wrapper in agents/src/document_analyzer/ocr.py
- [X] T025 [US2] Implement Compliance Agent logic in agents/src/compliance_agent/checker.py
- [X] T026 [US2] Define DocumentAnalysisWorkflow in backend/src/workflows/document-analysis.workflow.ts
- [X] T027 [US2] Implement Workflow Activities in agents/src/activities/analysis.py (STUBBED)
- [X] T028 [US2] Create Document Upload UI component in ui/src/components/document/Upload.tsx
- [X] T029 [US2] Create Readiness Score visualization in ui/src/components/analysis/ReadinessScore.tsx

**Checkpoint**: Full document analysis pipeline functional.

---

## Phase 5: User Story 4 - Policy Management & Approval (Priority: P2)

**Goal**: Admin tools to manage and approve policies.

**Independent Test**: Admin can update a policy and see it versioned.

### Implementation for User Story 4

- [X] T030 [US4] Implement Policy Admin Service (Draft/Approve) in backend/src/modules/policy/admin.service.ts
- [X] T031 [US4] Implement Admin API endpoints in backend/src/api/controllers/admin-policy.controller.ts
- [X] T032 [US4] Create Admin Dashboard Layout in ui/src/app/admin/layout.tsx
- [X] T033 [US4] Implement Policy Editor with YAML validation in ui/src/components/admin/PolicyEditor.tsx
- [X] T034 [US4] Implement Diff Viewer for policy versions in ui/src/components/admin/DiffViewer.tsx

**Checkpoint**: Admin governance capabilities active.

---

## Phase 6: User Story 3 - MESOB Online Submission (Priority: P3)

**Goal**: Submit validated package to MESOB portal.

**Independent Test**: "Submit" button triggers mock MESOB API call.

### Implementation for User Story 3

- [X] T035 [US3] Implement MESOB Connector Service (Mock) in backend/src/modules/connectors/mesob.service.ts
- [X] T036 [US3] Create Submission entity and repository in backend/src/modules/submission/
- [X] T037 [US3] Implement Submission Workflow in backend/src/workflows/submission.workflow.ts (STUBBED)
- [X] T038 [US3] Add "Submit Online" button and consent flow in ui/src/app/flows/submit/page.tsx
- [X] T039 [US3] Implement Submission Status Tracker UI in ui/src/components/submission/StatusTracker.tsx

**Checkpoint**: End-to-end submission flow works.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T040 Setup Cypress E2E testing framework in tests/e2e/
- [X] T041 Write E2E test for Trade License Flow in tests/e2e/trade-license.cy.ts
- [X] T042 Write E2E test for Document Upload in tests/e2e/document-upload.cy.ts
- [X] T043 Add detailed documentation for API and Agents in docs/
- [X] T044 Run final constitution check and security scan

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **US1 (Phase 3)**: Depends on Foundational
- **US2 (Phase 4)**: Depends on Foundational (Independent of US1)
- **US4 (Phase 5)**: Depends on Foundational (Independent of US1/US2)
- **US3 (Phase 6)**: Depends on US1 and US2 (needs playbook and validated docs)

### Parallel Opportunities

- **Setup**: Backend, Frontend, and Agents initialization can happen in parallel.
- **US1 & US2 & US4**: Can be developed in parallel by different teams after Phase 2.
- **Frontend/Backend**: Within each story, UI and API implementation can be parallelized once contracts are defined.

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Complete Setup & Foundation.
2. Implement Trade License Playbooks (US1).
3. Implement Document Analysis (US2).
4. **MVP Release**: Users can find playbooks and check docs.

### Incremental Delivery

1. Add Policy Management (US4) for Admins.
2. Add MESOB Submission (US3) for "One-Stop" experience.
