# Technical Plan: Frontend Public Portal

**Feature Branch**: `004-frontend-public-portal`  
**Spec**: [spec.md](spec.md)  
**Frameworks**: Next.js 14 (App Router), Tailwind CSS, PouchDB (Offline), Framer Motion (Transitions)

## Architectural Overview

The Public Portal will be built as a high-performance Progressive Web App (PWA) using Next.js. It will follow a "Local-First" architecture where all user interactions and document uploads are initially persisted to a local PouchDB instance, which then synchronizes with the backend via a sync worker.

### Key Components

1.  **Task Selector Hub**: Responsive grid of service tiles (Passport, Trade License, etc.).
2.  **Guided Wizard (Step-by-Step)**: A generic wizard engine that renders "Playbooks" fetched from the Policy Research module.
3.  **Document Analysis Dashboard**: Interactive UI for viewing document readiness, scores, and highlighted extraction results.
4.  **Sovereign Consent Modal**: Specialized component for capturing and signing user consent for data processing.
5.  **Offline Sync Service**: A background service (Service Worker + PouchDB) for data reconciliation.

## Implementation Phases

### Phase 1: Service Discovery & Wizard (US1)
- Scaffold Next.js app structure within `frontend/ui/`.
- Implement Amharic/English i18n using `next-intl`.
- Build the `TaskSelector` and `JurisdictionPicker` components.
- Implement the `PlaybookWizard` to render step-by-step guidance.

### Phase 2: Document Feedback & Intelligence (US2)
- Integrate with the Document Analysis API.
- Build the `ReadinessScore` and `DocumentPreview` components with bounding box overlays.
- Implement the "Fix Now" remediation flow for low-confidence fields.

### Phase 3: Offline Sync & PWA (US3)
- Configure `next-pwa` for offline asset caching.
- Set up `PouchDB` for local state persistence of the wizard progress.
- Implement the `SyncManager` to handle background data uploads once online.

### Phase 4: Submission & Tracking (US4)
- Build the `ConsentManager` for secure DPA acceptance.
- Implement the `TrackingTimeline` showing real-time updates from government portals.

## Technical Details

### State Management
- **UI State**: React `useState` and `useContext`.
- **Form State**: `react-hook-form` for complex wizard validation.
- **Persistent State**: `PouchDB` (local) syncing with `CouchDB/Backend` (remote).

### Styling
- **Tailwind CSS** with a custom theme reflecting the GovAssist Ethiopia brand (Green/Yellow/Red accents).
- **Responsive Design**: Mobile-first approach for all components.

### Testing Strategy
- **Unit**: Vitest for utility logic and state transitions.
- **E2E**: Cypress for full user journeys (Service Discovery -> Wizard -> Upload -> Submit).
- **Lighthouse**: Continuous monitoring of Accessibility (90+) and Performance (90+).