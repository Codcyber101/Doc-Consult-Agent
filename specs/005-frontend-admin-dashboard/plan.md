# Implementation Plan: Frontend Admin Dashboard

**Branch**: `005-frontend-admin-dashboard` | **Date**: 2026-01-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-frontend-admin-dashboard/spec.md`

## Summary

Implement a centralized governance and oversight interface for GovAssist Ethiopia. The dashboard will provide a YAML-based Policy Workspace, a Review Queue for agent ensemble escalations, a Research Lab for orchestrating policy discovery jobs, and a Sovereign Audit Explorer for cryptographic verification of system events.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+  
**Primary Dependencies**: Next.js (App Router), Tailwind CSS, Lucide React, TanStack Query, Monaco Editor (YAML), react-diff-viewer  
**Storage**: PostgreSQL (via Backend API), Kafka/EventStore (Audit Logs)  
**Testing**: Vitest (Unit), Cypress (E2E)  
**Target Platform**: Web (Desktop Optimized)  
**Project Type**: Web application (Frontend + Backend integration)  
**Performance Goals**: < 1s for policy diff rendering, < 500ms for audit event lookup  
**Constraints**: Sovereign infrastructure compliance (no external CDNs for fonts/scripts), PDPP-compliant PII handling in Review Queue.

## Project Structure

### Documentation (this feature)

```text
specs/005-frontend-admin-dashboard/
├── plan.md              # This file
├── spec.md              # Feature specification
├── checklists/
│   └── requirements.md  # Quality validation
└── tasks.md             # Implementation tasks
```

### Source Code

```text
ui/
├── src/
│   ├── app/
│   │   └── admin/
│   │       ├── policies/      # Policy Workspace
│   │       ├── review/        # Manual Review Queue
│   │       ├── research/      # Policy Research Lab
│   │       └── audit/         # Audit Trail Explorer
│   ├── components/
│   │   └── admin/
│   │       ├── PolicyEditor.tsx
│   │       ├── DiffViewer.tsx
│   │       ├── ReviewCard.tsx
│   │       └── AuditTable.tsx
│   └── lib/
│       └── api/
│           ├── admin.ts       # Admin-specific API clients
│           └── audit.ts       # Audit verification logic
```

**Structure Decision**: Integration into the existing `ui/` directory under the `/admin` route prefix. Components will be modularized in `src/components/admin/`.

## Implementation Strategy

### Phase 1: Review Queue & Document Comparison
- Build the `ReviewQueue` landing page showing items with `MANUAL_REVIEW` status.
- Implement the `ReviewCard` and side-by-side document comparison view.
- Connect to `POST /admin/documents/review/:id/approve` for HSM-signed decisions.

### Phase 2: Policy Workspace (Editor & Diff)
- Implement `PolicyEditor` using a web-based code editor with YAML schema validation.
- Build the `DiffViewer` to show changes between current and draft policies.
- Integrate "Run Tests" logic to trigger backend compliance validation.

### Phase 3: Research Lab & Audit Explorer
- Build the `ResearchLab` configuration form for the Policy Research Agent.
- Implement real-time job monitoring using server-sent events or polling.
- Build the `AuditExplorer` with search and "Verify Integrity" (Merkle proof) capabilities.
