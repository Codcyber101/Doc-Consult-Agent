# Feature Specification: Frontend Public Portal

**Feature Branch**: `004-frontend-public-portal`  
**Created**: 2026-01-12  
**Status**: Draft  
**Input**: User description: "Specify the Frontend Public Portal for GovAssist Ethiopia, a PWA-first application providing procedural guidance, document analysis feedback, and government portal submission for citizens and SMEs."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - SME Trade License Onboarding (Priority: P1)

A small business owner in Addis Ababa needs to renew their trade license. They open the GovAssist portal on their mobile phone, select "Renew Trade License", and are guided through a wizard that identifies their sub-city and specific business requirements. They receive a clear checklist of documents and next steps.

**Why this priority**: Core entry point for the platform's primary target persona.

**Independent Test**: Can be tested by navigating the task selector, choosing "Trade License", and verifying the display of the jurisdiction-specific checklist and wizard steps.

**Acceptance Scenarios**:

1. **Given** a user on the home screen, **When** they select "Register Business", **Then** the system MUST display a jurisdiction selector (Region -> City -> Sub-city).
2. **Given** a selected jurisdiction, **When** the user progresses, **Then** the system MUST display the relevant procedural playbook as a step-by-step interactive checklist.

---

### User Story 2 - Real-time Document Readiness Feedback (Priority: P1)

A citizen applying for a passport uploads a scan of their birth certificate. The frontend immediately displays a "Processing" state, then shows the document preview with highlighted fields and a readiness score (e.g., 85%). It flags a missing stamp and provides a "Fix Now" suggestion.

**Why this priority**: Demonstrates the core value of automated document intelligence and error prevention.

**Independent Test**: Can be tested by uploading a sample document and verifying that the UI displays the readiness score and specific remediation messages returned by the backend agents.

**Acceptance Scenarios**:

1. **Given** a document upload in progress, **When** the analysis completes, **Then** the UI MUST render a visual "Readiness Score" and a list of identified issues.
2. **Given** a flagged issue (e.g., "Blurry photo"), **When** the user clicks "Fix Now", **Then** the system MUST re-trigger the upload/capture interface for that specific document.

---

### User Story 3 - Offline Preparation & Sync (Priority: P2)

A user in a low-connectivity area completes 3 steps of a 5-step playbook and uploads 2 documents while offline. The portal indicates that the progress is saved locally. When the user returns to an area with internet access, the system automatically synchronizes the data and document queue with the server.

**Why this priority**: Critical for usability in the Ethiopian context where mobile data can be intermittent.

**Independent Test**: Can be tested by putting the browser in "Offline" mode, completing a step, and verifying that the step status is persisted in the local store (PouchDB) and synced upon "Online" restoration.

**Acceptance Scenarios**:

1. **Given** the device is offline, **When** a user saves a step, **Then** the UI MUST display a "Local Save" indicator and persist the data to IndexedDB.
2. **Given** a pending sync queue, **When** connectivity is restored, **Then** the system MUST automatically background-sync all pending actions and update the UI status to "Synced".

---

### User Story 4 - Secure Portal Submission (Priority: P3)

After reaching a 100% readiness score, the user opts to "Submit Online". The portal requests explicit consent, collects necessary portal credentials, and displays a real-time tracking timeline as the application moves through the MESOB connector.

**Why this priority**: Provides the "one-stop" closure for the user journey.

**Independent Test**: Can be tested by clicking "Submit" on a ready package and verifying the transition to the tracking screen with normalized status updates (e.g., "Under Review").

**Acceptance Scenarios**:

1. **Given** a 100% ready package, **When** the user clicks "Submit", **Then** the system MUST present a mandatory data processing consent (DPA) modal.
2. **Given** a successful submission, **When** the tracking screen is active, **Then** the system MUST display a unified timeline showing both internal and external (government) status updates.

### Edge Cases

- **Incomplete Profile during Sync**: If a sync occurs but the user profile is missing mandatory Fayda/Identity data, the system MUST pause the sync and prompt the user for the missing fields.
- **Large Document Uploads**: If a user attempts to upload a file exceeding the size limit (e.g., > 50MB), the frontend MUST intercept and provide a compression or split-file recommendation.
- **Expired Sessions during Wizard**: If the user's session expires mid-wizard, the system MUST persist the current step's draft locally and prompt for re-login without data loss.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001: Task Selection**: System MUST provide a tile-based UI for discovering government services (Trade License, Passport, TIN).
- **FR-002: Wizard Framework**: System MUST support a step-by-step guided data entry flow with "Save & Resume" capability.
- **FR-003: Document Intelligence UI**: System MUST render document previews with bounding boxes/highlights for extracted data and confidence flags.
- **FR-004: Offline Persistence**: System MUST utilize a client-side storage mechanism to store playbook progress and document metadata while disconnected.
- **FR-005: Real-time Sync**: System MUST implement a background sync worker to reconcile local data with the server upon connectivity restoration.
- **FR-006: Language Support**: UI MUST support full Amharic and English localization with a toggle in the header.
- **FR-007: Submission Tracking**: System MUST provide a unified dashboard for tracking the status of all active and historic submissions.
- **FR-008: Consent Management**: System MUST explicitly capture and store cryptographically linked user consent before PII rehydration or portal submission.

### Key Entities *(include if feature involves data)*

- **LocalStep**: A client-stored version of a playbook step, containing draft form data.
- **SyncQueueItem**: A pending action (upload, save, submit) waiting for a stable server connection.
- **DocumentPreview**: A visual representation of an uploaded file with associated analysis highlights and confidence metadata.
- **UserPreference**: Settings including language, jurisdiction, and notification opt-ins.

## Assumptions & Dependencies

### Assumptions
- **Mobile Browser**: Users are using modern mobile browsers (Chrome/Safari) that support PWAs and IndexedDB.
- **Amharic Fonts**: System assumes standard Amharic Unicode support on user devices.
- **Identity Mock**: Initial frontend testing will use a mock Fayda login flow.

### Dependencies
- **Backend API**: Depends on the availability of the Analysis and Policy modules.
- **PouchDB/CouchDB**: Depends on a correctly configured CouchDB sync gateway for multi-device synchronization.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can find their target service and start a playbook in under 3 clicks from the home screen.
- **SC-002**: 100% of locally saved data is successfully synchronized to the server within 30 seconds of returning online.
- **SC-003**: 95% of users successfully complete the "Readiness" check without requiring technical support.
- **SC-004**: The PWA scores 90+ on Lighthouse accessibility and performance metrics.
