# Feature Specification: Frontend Admin Dashboard

**Feature Branch**: `005-frontend-admin-dashboard`  
**Created**: 2026-01-12  
**Status**: Draft  
**Input**: User description: "Develop the Admin Dashboard for GovAssist Ethiopia, including Policy Editor, Review Queue for agent escalations, Policy Research Lab, and Audit Trail Explorer."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Policy Authoring & Versioning (Priority: P1)

As an Admin (Policy Owner), I want to create and edit procedural playbooks using a YAML-based editor so that I can update government requirements as laws change. I need to see a diff of my changes and run test cases before publishing.

**Why this priority**: Core governance feature. Policies drive the entire system's guidance and compliance logic.

**Independent Test**: Can be tested by opening the Policy Editor, making a change to a YAML playbook, viewing the diff, and saving a draft.

**Acceptance Scenarios**:

1. **Given** the Policy Editor, **When** I modify a step's fee in `trade-license.yaml`, **Then** the UI MUST show a clear side-by-side diff of the change.
2. **Given** a policy draft, **When** I click "Run Tests", **Then** the system MUST execute the Compliance Agent against the provided `test_cases` and display pass/fail results.

---

### User Story 2 - Resolving Manual Review Escalations (Priority: P1)

As a Reviewer or Admin, I want to view a queue of documents flagged for "Manual Review" by the agent ensemble so that I can verify low-confidence OCR or complex compliance failures and issue a final signed decision.

**Why this priority**: Essential for handling the "edge cases" where AI confidence is low, ensuring 100% reliability for users.

**Independent Test**: Can be tested by navigating to the Review Queue, selecting a pending document, and applying an "Approve" override.

**Acceptance Scenarios**:

1. **Given** a document in the Review Queue, **When** I view the details, **Then** the UI MUST show the original scan, the extracted text, and the reason for escalation (e.g., "Missing Stamp").
2. **Given** a reviewer's correction, **When** they click "Finalize & Sign", **Then** the system MUST trigger the HSM signing process and move the document to the "Completed" state.

---

### User Story 3 - Policy Research Lab (Priority: P2)

As an Admin, I want to trigger the Policy Research Agent (PRA) to crawl government websites for new proclamations so that I can quickly draft new playbooks based on automated research.

**Why this priority**: Scales the platform's ability to support new services and jurisdictions.

**Independent Test**: Can be tested by submitting a research query (e.g., "New Investment Proclamation 2025") and monitoring the job status.

**Acceptance Scenarios**:

1. **Given** the Research Lab, **When** I enter a search query and an allowed domain, **Then** the system MUST display a "Research in Progress" status with real-time logs.
2. **Given** a completed research job, **When** I click "View Draft", **Then** the UI MUST show the generated YAML alongside citations and source snippets.

---

### User Story 4 - Sovereign Audit Explorer (Priority: P3)

As an Auditor, I want to browse the immutable event log and verify the integrity of specific artifacts using Merkle root proofs so that I can ensure the system has not been tampered with.

**Why this priority**: Compliance requirement for sovereign systems and legal defensibility.

**Independent Test**: Can be tested by searching for a specific application ID and viewing its cryptographically signed event chain.

**Acceptance Scenarios**:

1. **Given** the Audit Explorer, **When** I select an application, **Then** the system MUST display a chronological timeline of all agent actions, each with its digital signature.

### Edge Cases

- **Concurrent Policy Edits**: If two admins edit the same policy, the system MUST detect the conflict and prompt for a manual merge.
- **HSM Unavailability**: If the signing service is down during a review finalization, the UI MUST show a clear error and persist the decision as "Pending Signature".
- **Empty Research Results**: If the PRA finds no relevant data, it MUST return a "No Sources Found" status rather than a hallucinated draft.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001: Policy Workspace**: System MUST provide a web-based YAML editor with syntax highlighting and schema validation.
- **FR-002: Diff Engine**: System MUST generate and display visual diffs between policy versions.
- **FR-003: Review Queue**: System MUST display a sortable list of documents with status `MANUAL_REVIEW`.
- **FR-004: Document Comparison UI**: System MUST show side-by-side view of document scans and AI-extracted metadata for reviewers.
- **FR-005: Research Orchestrator**: System MUST provide a form to configure and start PRA jobs (Query, Domains, Depth).
- **FR-006: Job Monitor**: System MUST show the real-time status and logs of background Temporal/LangGraph jobs.
- **FR-007: Audit Log Viewer**: System MUST provide a read-only view of the Kafka/Postgres audit events.
- **FR-008: Cryptographic Verification**: System MUST provide a "Verify Integrity" button that checks the HSM signature of any artifact.

### Key Entities *(include if feature involves data)*

- **DraftPolicy**: A non-published playbook version undergoing review or research.
- **ReviewItem**: An escalation record linking a `document_id` to a specific `reason` and `workflow_id`.
- **ResearchJob**: A background task tracking the progress of the Policy Research Agent.
- **AuditEvent**: A signed record of a system or agent action.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Admins can approve or reject a manual review item in under 60 seconds of interaction time.
- **SC-002**: 100% of policy changes are recorded with a version history and user attribution.
- **SC-003**: Research jobs provide source citations for at least 90% of generated policy snippets.
- **SC-004**: The Audit Explorer can verify the integrity of any signed artifact in under 2 seconds.