---
name: govassist-production-hardening
overview: Plan to harden the GovAssist Ethiopia codebase from MVP/mock stage to a production-ready, spec-aligned platform.
todos:
  - id: backend-doc-lifecycle
    content: Implement full document lifecycle APIs and persistence for upload/analyze/analysis endpoints in the backend.
    status: completed
  - id: deterministic-compliance
    content: Design and implement a deterministic compliance engine tied to Policy Registry YAMLs and ComplianceReport schema.
    status: completed
  - id: wire-agents-backend
    content: Connect Temporal workflows and backend services to the Python orchestrator, persisting analysis and audit results.
    status: completed
  - id: ui-backend-integration
    content: Update UI wizards and readiness/track screens to use real backend APIs instead of local mocks.
    status: completed
  - id: mesob-integration
    content: Replace MESOB mocks with real connector integration and submission tracking endpoints + UI wiring.
    status: completed
  - id: offline-sync-hardening
    content: Finalize offline data model, enable real PouchDB replication, and handle conflicts and failures gracefully.
    status: completed
  - id: security-hardening
    content: Remove hardcoded secrets, integrate Vault/HSM for signing keys, and harden auth, rate limiting, and headers.
    status: completed
  - id: observability-audit
    content: Implement metrics, centralized logging, and a unified, signed audit ingestion + admin audit UI.
    status: completed
  - id: testing-ci
    content: Expand unit/contract/E2E tests across backend, agents, and UI, and enforce them in CI as required by AGENTS.md.
    status: in_progress
isProject: false
---

## Production-readiness plan for GovAssist Ethiopia

### 1) Close backend API & persistence gaps

- **Implement full document lifecycle APIs**:
  - Wire `/documents/upload`, `/documents/{id}/analyze`, and `/analysis/{id}` to actual TypeORM entities and Temporal workflows, using the existing contracts in `[contracts/openapi/public-api.yaml](contracts/openapi/public-api.yaml)` and schemas in `[contracts/schemas](contracts/schemas)`.
  - On upload, create a real `Document` row (`[backend/src/models/document.entity.ts](backend/src/models/document.entity.ts)`), compute and store checksum, user id, storage path, and job id; return the true UUID.
  - Implement controllers for `analyzeDocument` and `getAnalysis` that: start the Temporal `DocumentAnalysisWorkflow`, track status, and expose a persisted `Analysis` model that matches `ComplianceReport` plus OCR metadata.
- **Persist playbooks and policies where needed**:
  - Decide whether playbooks remain filesystem-only (`policy-registry`) or are also denormalized into DB; if DB-backed, create repository/services to keep `Playbook` entity in sync with YAML.
  - Extend `PolicyAdminService` to run validation/tests (e.g., a `policies:verify` command) before approving drafts, using `test_cases` from the `Policy` entity.
- **Add missing endpoints for human review and tracking**:
  - Implement a `review` controller on the backend (e.g. `POST /review/submit`, `GET /review/:id`, `GET /review/queue`) to persist escalations coming from `HumanReviewAgent` and expose them to the admin UI.
  - Implement submission tracking endpoints (`/submissions`, `/submissions/:id/status`) backed by `Submission` entity (`[backend/src/models/submission.entity.ts](backend/src/models/submission.entity.ts)`), mapping to MESOB connector responses.

### 2) Harden Compliance & Policy enforcement

- **Move from LLM-only to deterministic rule engine**:
  - Introduce a deterministic compliance engine in `agents/src/compliance_agent` that:
    - Loads policy YAMLs from `policy-registry` and converts them into executable rules (e.g. via a rules DSL or compiled checks).
    - Produces outputs exactly matching `ComplianceReport` schema, including `readiness_score`, `issues`, and severities.
  - Keep the LLM-based `ComplianceAgent` as an *assistant* for explanations, but ensure the **source of truth decision** (PASS/FAIL/MANUAL_REVIEW) is based on deterministic policy evaluation.
- **Tie regulations retrieval to Policy Registry**:
  - Extend `HybridRetriever` (`[agents/src/regulation_expert/retrieval.py](agents/src/regulation_expert/retrieval.py)`) so indexed `RegulationSnippet` objects carry stable policy IDs/versions from the YAML registry, not free-form text only.
  - Ensure any RAG guidance or citations returned by backend `GuidanceController` are anchored to those policy IDs and versions.

### 3) Wire agents to backend and UI

- **Backend ↔ agents integration**:
  - Define a clear API boundary for the orchestrator (e.g. a single backend service that enqueues a document for analysis and calls the Python agents via HTTP, gRPC, or Temporal activities).
  - Ensure the Temporal `DocumentAnalysisWorkflow` calls into the Python orchestrator (`agents/src/orchestrator/graph.py`), and on completion:
    - Writes analysis + compliance results back into Postgres (`Analysis` table) and MinIO where needed.
    - Emits `AuditEvent` records in the backend, mirroring the signed agent-side logs.
- **UI ↔ backend integration**:
  - Update `DocumentUploadWidget`, `TradeLicenseWizardContent`, and other flows in `ui/src` to call the real backend endpoints:
    - Upload files to `/v1/documents/upload` and save returned `document_id` in local state/PouchDB.
    - Trigger `/v1/documents/{id}/analyze` and poll `/v1/analysis/{analysisId}` to drive `ReadinessPanel` and remediation lists with real data.
  - Replace mocked readiness scores, quality checks, and tracking timelines with live data from backend `Analysis` and `Submission` endpoints.

### 4) MESOB connector & end-to-end submission

- **Implement real MESOB integration**:
  - Replace the mock `MesobConnectorService` implementation with real HTTP calls, configurable via environment variables and safely stored credentials.
  - Extend `MesobTemplate` (`[agents/src/portal_connector/templates/mesob.py](agents/src/portal_connector/templates/mesob.py)`) to support the main MESOB flows (e.g., trade license, passport), based on the actual MESOB API schema.
- **Submission flow wiring**:
  - Update the frontend submission page (`ui/src/app/flows/submit/page.tsx`) and consent UI (`components/submission/ConsentModal.tsx`) to:
    - On user consent, call a backend `POST /submissions` endpoint that constructs the MESOB payload from the validated package and uses `MesobConnectorService` to submit.
    - Display real `application_id` and use `GET /submissions/:id/status` for tracking.

### 5) Offline & sync robustness

- **Finalize offline data model and replication**:
  - Define which entities must be available offline (wizard drafts, playbooks, user profile, cached analyses) and map them to PouchDB documents.
  - Enable real replication in `sync-playbooks.ts` and any other sync modules, pointing to a CouchDB-compatible backend with authentication.
- **Conflict handling and resilience**:
  - Implement conflict resolution strategies for drafts and playbooks (e.g., last-write-wins for drafts; registry is read-only on client).
  - Add retry/backoff logic for sync failures and surface sync status in the UI (using `SyncStateIndicator` / `SyncStatus` components).

### 6) Security, secrets, and compliance

- **Eliminate hardcoded secrets and align with Vault/HSM model**:
  - Replace the hardcoded signing secret in `Signer` (`[agents/src/common/signing.py](agents/src/common/signing.py)`) with a proper HSM/Vault-backed key reference, using placeholders like `${VAULT_KEY_SIGNING}` in code and configuration.
  - Audit the repo for any other embedded secrets or credentials and move them into secure configuration.
- **Hardening and auth**:
  - Ensure `AuthGuard` is wired to a real IdP (Keycloak/Fayda mock in dev) with JWT validation, roles, and scopes that protect admin policy routes and audit endpoints.
  - Enforce rate limits, CORS policies, and HTTP security headers via `helmet` and `express-rate-limit` as per `backend/package.json` dependencies.

### 7) Observability & audit trail completion

- **Backend observability**:
  - Add Prometheus metrics for:
    - OCR job durations and error rates.
    - Compliance evaluations and manual review escalations.
    - MESOB submission latency and failure rates.
  - Configure centralized logging (e.g., structured JSON logs shipped to ELK or similar), tagging with `x-correlation-id` and Temporal workflow id.
- **Unified audit pipeline**:
  - Connect agent-side `AuditLogger` to a backend audit ingestion endpoint (e.g., `POST /audit/events`) that persists signed events into an immutable table or log store.
  - Expose audit records to the admin UI (`ui/src/app/admin/audit/page.tsx`) with pagination, filtering, and signature verification on demand.

### 8) Testing, quality gates, and CI

- **Expand automated tests**:
  - Add unit tests for:
    - New backend controllers and services (document lifecycle, submissions, review queue).
    - Deterministic compliance engine (rule evaluation against sample policies).
  - Strengthen Python tests in `agents/tests` to cover:
    - PII masking edge cases.
    - Orchestrator routing (low-confidence OCR, compliance failures, manual review).
- **Contract & E2E tests**:
  - Add contract tests to ensure backend responses conform to `contracts/openapi/public-api.yaml` and schema files.
  - Implement E2E tests (Cypress + test backend agents) to cover the main SME flow: trade license renewal from entry → readiness → consent → MESOB submission → status tracking.
- **CI enforcement**:
  - Configure CI to run: TypeScript lint/tests, Python lint/tests, contract validation, SAST, and to block merges if `/specs` or `/policy-registry` are modified without an SCR as per `/AGENTS.md`.

### 9) UX & localization polish

- **Tighten UX around real data**:
  - Once backend integration is in place, refine the wizard to show real remediation messages coming from `ComplianceReport.issues` (e.g., “Missing stamp”, “Photo blurry”).
  - Connect `ProvenanceViewer` to actual provenance/audit records so users and admins can inspect source docs, pages, and signatures.
- **Localization & accessibility**:
  - Ensure all text is wired through `i18next` (`locales/en.json`, `locales/am.json`) and cover key flows in both Amharic and English.
  - Run an accessibility pass (keyboard navigation, ARIA roles, contrast) to make the wizard and dashboards usable in crowded, low‑light environments.


