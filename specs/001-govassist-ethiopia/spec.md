# Feature Specification: GovAssist Ethiopia (GAE)

**Feature Branch**: `001-govassist-ethiopia`  
**Created**: 2026-01-11  
**Status**: Draft  
**Input**: User description: "Implement GovAssist Ethiopia (GAE) platform based on the final PRD and technical specification."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Trade License Renewal (Priority: P1)

An SME owner in Addis Ababa needs to renew their trade license. They use GovAssist to identify the correct jurisdiction-specific playbook, understand the required documents, and verify their documentation readiness before visiting a bureau or submitting online.

**Why this priority**: This is the core MVP flow that addresses the primary pain point: reducing rejections and repeated bureau visits for common administrative tasks.

**Independent Test**: Can be tested by selecting the "Renew trade license" flow, successfully identifying the Bole sub-city playbook, and receiving a "Readiness Score" for uploaded sample documents.

**Acceptance Scenarios**:

1. **Given** a user selects "Renew trade license" and "Bole sub-city", **When** they view the playbook, **Then** they see a prioritized checklist of documents, fees, and office locations.
2. **Given** a user uploads a scanned trade license and lease agreement, **When** the system analyzes the documents, **Then** it must provide a readiness score and flag missing elements (e.g., missing stamp).

---

### User Story 2 - Document Analysis & Readiness (Priority: P2)

A citizen applying for a passport wants to ensure their birth certificate and ID photos meet government standards. They upload their documents to receive instant feedback on quality, layout, and compliance with passport office rules.

**Why this priority**: Automated document validation reduces the load on human reviewers and provides immediate value to users by preventing simple submission errors.

**Independent Test**: Can be tested by uploading a blurry photo or an incomplete form and verifying that the system identifies the specific failure reason (e.g., "Photo is blurry," "Signature missing").

**Acceptance Scenarios**:

1. **Given** a user uploads a document, **When** the analysis is triggered, **Then** the system must display extracted fields and highlight areas requiring correction.
2. **Given** a document with low OCR confidence, **When** analysis completes, **Then** the system MUST flag the document for human review while explaining the uncertainty to the user.

---

### User Story 3 - MESOB Online Submission (Priority: P3)

After validating their documents, a user chooses to submit their application directly to the government's MESOB portal through GovAssist. They provide explicit consent and credentials for the portal.

**Why this priority**: Provides a seamless "one-stop" experience, moving from preparation to execution without leaving the platform.

**Independent Test**: Can be tested by successfully mapping a GovAssist validated package to the MESOB API schema and receiving a submission tracking ID.

**Acceptance Scenarios**:

1. **Given** a validated application package and user consent, **When** the user clicks "Submit Online", **Then** the system MUST transmit the package to the MESOB connector and return an application ID.
2. **Given** a submission is in progress, **When** the portal status updates, **Then** GovAssist must display the normalized status (e.g., "Under Review") in the user dashboard.

---

### User Story 4 - Policy Management & Approval (Priority: P2)

An Admin (Policy Owner) needs to update a trade license requirement due to a new government proclamation. They use the platform to draft the new policy, run simulations, and approve it for the Compliance Agent to enforce.

**Why this priority**: Ensures the system remains authoritative and up-to-date with changing regulations.

**Independent Test**: Can be tested by creating a draft policy YAML, passing CI validation tests, and approving it to see the Compliance Agent use the new rule.

**Acceptance Scenarios**:

1. **Given** a new draft policy, **When** an admin initiates a review, **Then** the system must show a diff against the current policy and run pre-defined test cases.
2. **Given** an approved policy update, **When** the effective date is reached, **Then** all new compliance checks MUST use the updated ruleset.

### Edge Cases

- **Offline Connectivity**: What happens when a user completes 80% of a playbook offline? The system MUST persist progress locally and sync automatically when a connection is restored.
- **Low OCR Confidence**: How does the system handle handwriting or stamps it cannot read? It MUST flag these for human review and prevent "Success" readiness scores until verified.
- **Fayda Sandbox Unavailability**: In the absence of a live Fayda sandbox, the system MUST use a mock identity provider that follows the expected OIDC flow.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide versioned Procedural Playbooks for target flows (Trade License, VAT, Passport).
- **FR-002**: System MUST perform layout-aware OCR and document intelligence with Amharic language support.
- **FR-003**: System MUST enforce deterministic compliance checks against an approved Policy Registry.
- **FR-004**: System MUST ensure PII is masked or anonymized before any external/cloud processing.
- **FR-005**: System MUST maintain an immutable audit log of all agent decisions and human approvals.
- **FR-006**: System MUST support offline-first preparation of document packages.
- **FR-007**: System MUST provide a connector for MESOB integration with user-consent management.
- **FR-008**: System MUST provide an Admin UI for policy authoring, testing, and approval.

### Key Entities *(include if feature involves data)*

- **User**: Represents a citizen or SME owner with profile and consent status.
- **Policy**: A deterministic rule or regulation stored in the Policy Registry.
- **Playbook**: A versioned, step-by-step procedural guide for a specific government service.
- **Document**: An uploaded file (PDF/Image) with associated OCR metadata.
- **Analysis**: The result of OCR and compliance checks on a set of documents.
- **Submission**: A record of an application package sent to a government portal (e.g., MESOB).
- **AuditEvent**: A signed record of a system or user action for auditing purposes.

## Assumptions & Dependencies

### Assumptions
- **User Device**: Users have access to a smartphone or computer with a camera for document scanning.
- **Internet Access**: While offline-capable, users will eventually have access to a stable internet connection for synchronization and submission.
- **Language Support**: Initial focus is on Amharic and English; other Ethiopian regional languages are deferred.
- **Data Privacy**: Users will grant necessary permissions for document storage and PII processing as part of the onboarding.

### Dependencies
- **Government Portals**: Successful "Online Submission" depends on the availability and stability of the MESOB API.
- **Identity Verification**: Depends on the integration (or mock) of the Fayda national ID system.
- **OCR Engine**: Accuracy depends on the availability of a fine-tuned Amharic OCR model (e.g., Tesseract ensemble).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify their required documents and office location for a flow in under 2 minutes.
- **SC-002**: First-pass acceptance rate for GovAssist-validated applications reaches 85% during pilot.
- **SC-003**: PII redaction accuracy for known Ethiopian document patterns is 99% or higher.
- **SC-004**: Offline-to-online synchronization of document packages succeeds 99.9% of the time.
- **SC-005**: 90% of users successfully complete the "Readiness" check on their first attempt without human assistance.