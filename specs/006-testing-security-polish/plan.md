# Technical Plan: Testing, Security, and Polish

**Feature Branch**: `006-testing-security-polish`  
**Spec**: [spec.md](spec.md)  
**Tools**: Cypress (E2E), k6 (Load), PDPP Mapping (Doc), Markdown (Deployment Guide)

## Summary

Establish the final quality and security gates for the GAE prototype. This phase focuses on automating the core user journeys via Cypress, auditing data flows against Ethiopian law (PDPP No. 1321/2024), verifying performance under load, and consolidating deployment knowledge into a comprehensive guide.

## Technical Context

**Testing Framework**: Cypress 13+ for E2E, Vitest for Frontend Unit  
**Load Testing**: k6 (JavaScript)  
**Security Reference**: Proclamation No. 1321/2024 (Data Protection)  
**Environment**: Local dev + Mocked Backend Services

## Implementation Phases

### Phase 1: E2E Automation (US1)
- Scaffold Cypress in `tests/e2e/`.
- Implement `trade-license.cy.ts` covering:
    - Service discovery from Home.
    - Jurisdiction selection.
    - Document upload interaction.
    - Consent and submission flow.
- Implement `admin-governance.cy.ts` covering Policy editing and Review Queue navigation.

### Phase 2: Security & Privacy Audit (US2)
- Create `docs/security-privacy.md`.
- Map system components (MinIO, Safety Agent, LangGraph) to PDPP principles:
    - Lawfulness & Fairness.
    - Purpose Limitation.
    - Data Minimization (Safety Agent's role).
    - Accuracy.
    - Storage Limitation (MinIO TTLs).
    - Integrity & Confidentiality (HSM & Merkle).

### Phase 3: Load Testing & Performance (US3)
- Refine the existing `tests/load/agent_load_test.js`.
- Execute a baseline run and document the performance bottlenecks.
- Finalize the `docs/api/agents-internal.yaml` OpenAPI documentation.

### Phase 4: Final Documentation & Handover
- Create `docs/deployment.md` with:
    - Infrastructure requirements (RAM/GPU).
    - Docker-compose orchestration setup.
    - HSM/Signing configuration steps.
    - Offline sync troubleshooting.

## Verification & Polish
- Run all Cypress tests.
- Verify all documentation links and formatting.
- Final commit and PR preparation.
