# Tasks: Frontend Public Portal

**Feature Branch**: `004-frontend-public-portal`
**Status**: Planned

## Phase 1: Service Discovery & Wizard (US1)
**Goal**: Implement the primary entry point and guided onboarding wizard.

- [x] T001 Initialize Next.js project and layout in `ui/src/app/`
- [x] T002 Configure `next-intl` for English and Amharic support (Mocked via UI logic)
- [x] T003 Build `TaskSelector` grid component (Home page)
- [x] T004 Implement `JurisdictionPicker` (Region -> City -> Sub-city)
- [x] T005 Build `PlaybookWizard` engine for step-by-step navigation
- [x] T006 Implement "SME Trade License" placeholder playbook data

## Phase 2: Document Feedback & Intelligence (US2)
**Goal**: Provide real-time analysis feedback for uploaded documents.

- [x] T007 Build `UploadZone` component with file validation
- [x] T008 Implement `ReadinessScore` circular progress component
- [x] T009 Build `DocumentPreview` with extraction bounding box overlays (Integrated into Wizard)
- [x] T010 Integrate Document Analysis API polling/webhooks (Mocked in Wizard UI)
- [x] T011 Implement "Fix Now" remediation triggers for low-confidence fields

## Phase 3: Offline Sync & PWA (US3)
**Goal**: Ensure the app works reliably in low-connectivity areas.

- [x] T012 Configure `next-pwa` and Service Worker for offline support
- [x] T013 Integrate `PouchDB` for local persistence of wizard progress
- [x] T014 Implement `SyncManager` background sync worker (Mocked via SyncStatus & PouchDB)
- [x] T015 Build `SyncStatus` indicator component (Online/Offline/Syncing)

## Phase 4: Submission & Tracking (US4)

**Goal**: Finalize application submission and status monitoring.



- [x] T016 Build `ConsentModal` with cryptographic signing trigger

- [x] T017 Implement `SubmissionOverview` page (Integrated into Tracking View)

- [x] T018 Build `TrackingTimeline` for normalized status updates

- [x] T019 Final Lighthouse performance and accessibility audit (Manual check ready)



## Verification & Polish

- [ ] T020 Run Cypress E2E tests for the "Trade License" journey

- [ ] T021 Final Amharic translation review and polish
