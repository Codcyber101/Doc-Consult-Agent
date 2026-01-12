# Tasks: Testing, Security, and Polish

**Feature Branch**: `006-testing-security-polish`
**Status**: Planned

## Phase 1: E2E Automation (US1)
**Goal**: Automate core user and admin journeys.

- [x] T001 Scaffold Cypress in `tests/e2e/` with base config
- [x] T002 Implement `trade-license.cy.ts` (Happy Path)
- [x] T003 Implement `admin-review.cy.ts` (Queue & Editor)
- [ ] T004 Add Cypress commands for mock login/auth
- [ ] T005 Create `tests/fixtures/sample-docs/` with test artifacts

## Phase 2: Security & Privacy Audit (US2)
**Goal**: Map platform controls to Ethiopian PDPP No. 1321/2024.

- [x] T006 Create `docs/security-privacy.md` with PDPP mapping table
- [x] T007 Document PII flow from upload to Safety Agent masking (Included in security-privacy.md)
- [x] T008 Detail HSM signing and Merkle anchoring logic for legal non-repudiation (Included in security-privacy.md)
- [x] T009 Perform final "Constitution Check" for privacy compliance

## Phase 3: Load Testing & Performance (US3)
**Goal**: Verify system stability and document performance baseline.

- [x] T010 Refine `tests/load/agent_load_test.js` for 10 concurrent users
- [ ] T011 Document performance baseline (P95 latencies) in `docs/performance.md`
- [x] T012 Finalize OpenAPI schema in `docs/api/agents-internal.yaml`

## Phase 4: Final Documentation & Handover
**Goal**: Consolidate deployment and operational knowledge.

- [x] T013 Create `docs/deployment.md` (Sovereign Setup Guide)
- [ ] T014 Update root `README.md` with project status and quickstart links
- [x] T015 Perform final code polish and remove implementation stubs/logs


## Verification
- [ ] T016 Run full E2E suite and verify 100% pass rate
- [ ] T017 Validate all documentation links and markdown formatting
