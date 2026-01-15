# Tasks: Frontend Admin Dashboard

**Feature Branch**: `005-frontend-admin-dashboard`
**Status**: Planned

## Phase 1: Review Queue & Document Comparison
**Goal**: Resolve manual review escalations from the agent ensemble.

- [x] T001 Build `ReviewQueue` page in `ui/src/app/admin/review/page.tsx`
- [x] T002 Create `ReviewCard` component for queue items in `ui/src/components/admin/ReviewCard.tsx`
- [x] T003 Implement `DocumentComparison` UI (Scan vs Metadata) in `ui/src/components/admin/DocumentComparison.tsx`
- [x] T004 Integrate Approve/Reject API calls with HSM signature feedback (Mocked in UI)
- [x] T005 Add "Correction Mode" to allow reviewers to edit extracted fields (Integrated into Comparison UI)

## Phase 2: Policy Workspace (Editor & Diff)
**Goal**: Author and version procedural playbooks with validation.

- [x] T006 Implement `PolicyList` page showing all playbooks and jurisdictions
- [x] T007 Build `PolicyEditor` with YAML syntax highlighting in `ui/src/components/admin/PolicyEditor.tsx`
- [ ] T008 Implement `DiffViewer` using `react-diff-viewer` in `ui/src/components/admin/DiffViewer.tsx`
- [x] T009 Add "Run Tests" trigger to validate YAML against backend compliance engine (Integrated into Editor)
- [ ] T010 Implement version history and rollback UI

## Phase 3: Research Lab & Audit Explorer
**Goal**: Orchestrate policy discovery and verify system integrity.

- [x] T011 Build `ResearchLab` job configuration form in `ui/src/app/admin/research/page.tsx`
- [x] T012 Implement real-time `JobMonitor` for tracking PRA progress (Mocked in Research Lab UI)
- [x] T013 Build `AuditExplorer` table with search/filter in `ui/src/app/admin/audit/page.tsx`
- [x] T014 Implement "Verify Integrity" button with Merkle proof visualization
- [x] T015 Add exports for audit logs (CSV/PDF) (Mocked via UI buttons)

## Verification & Polish
- [ ] T016 Run Cypress E2E tests for the "Policy Edit -> Test -> Publish" flow
- [ ] T017 Final accessibility audit for admin tools (WCAG 2.1 compliance)
