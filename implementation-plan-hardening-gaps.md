# Implementation Plan: GAE Hardening - Security, Audit, and UX

This plan addresses the remaining gaps identified in the production hardening analysis: Vault integration for secrets, real Merkle/HMAC integrity verification for audit logs, and an accessibility pass for the UI.

## 1. Understanding
The goal is to transition the codebase from "mocked production readiness" to "integrated production readiness". 
- **Security**: Move away from simple environment variables for the `SIGNING_SECRET` to a `SecretManager` that supports HashiCorp Vault.
- **Audit**: Enable cryptographical verification of audit records from the Admin UI.
- **UX**: Finalize accessibility features (ARIA, keyboard nav) to ensure the platform is usable in diverse environments.

### Success Criteria:
- [ ] `Signer` uses `SecretManager` to resolve keys.
- [ ] Admin UI "Verify HSM" button performs real cryptographic verification via backend.
- [ ] Keyboard navigation and ARIA roles are verified across core flows (Upload, Review, Audit).

## 2. Analysis
### Security (Agents)
- **Current**: `agents/src/common/signing.py` reads `SIGNING_SECRET` directly from `os.getenv`.
- **Target**: Introduce `agents/src/common/secrets.py` with a `SecretManager` class. It will handle the `${VAULT_KEY_x}` pattern.

### Audit (Backend & UI)
- **Current**: Audit records are stored with a signature, but verification is mocked/placeholder.
- **Target**: Implement HMAC verification in `backend/src/modules/audit/audit-ingest.service.ts`.
- **Target**: Wire up the "Verify" button in `ui/src/components/admin/AuditTable.tsx`.

### Accessibility (UI)
- **Current**: Most components use standard Radix UI primitives (accessible by default), but custom widgets like `DocumentUploadWidget` and wizard steps need verification.

## 3. Architecture
- **Secret Resolution**: `SecretManager` will check for `VAULT_ADDR`. If present, it uses `hvac` to fetch secrets. If absent, it falls back to `os.getenv` but strips `${...}` wrappers if they exist.
- **Cross-Language HMAC**: Use `crypto` module in Node.js and `hmac` in Python. Both must use `JSON.stringify(sort_keys=True)` equivalent logic.

## 4. Task Breakdown
### [Task 1]: Implement SecretManager (Agents)
- Create `agents/src/common/secrets.py`.
- Support Vault (via `hvac`) and Env fallback.
- **Effort**: 2
- **Files**: `agents/src/common/secrets.py`

### [Task 2]: Refactor Signer (Agents)
- Update `agents/src/common/signing.py` to use `SecretManager`.
- **Effort**: 1
- **Files**: `agents/src/common/signing.py`

### [Task 3]: Backend Integrity Verification (Backend)
- Add `verifySignature(event: AuditEvent): boolean` to `AuditIngestService`.
- Add `POST /v1/audit/:id/verify` endpoint.
- **Effort**: 2
- **Files**: `backend/src/modules/audit/audit-ingest.service.ts`, `backend/src/api/controllers/audit.controller.ts`

### [Task 4]: Connect Audit UI (UI)
- Update `AuditTable.tsx` to call the verification API.
- Show success/error toast with signature details.
- **Effort**: 2
- **Files**: `ui/src/components/admin/AuditTable.tsx`

### [Task 5]: Accessibility Pass (UI)
- Add missing ARIA labels to `DocumentUploadWidget`.
- Ensure keyboard focus management in wizard steps.
- **Effort**: 2
- **Files**: `ui/src/components/domain/DocumentUploadWidget.tsx`, `ui/src/components/domain/WizardShell.tsx`

## 5. Dependencies
- Internal: `AuditIngestService` needs to share the `SIGNING_SECRET` (or a known verification key) with the agents.
- External: `hvac` (optional but recommended for Python).

## 6. Risk Assessment
| Risk | Category | Impact | Mitigation |
|------|----------|--------|------------|
| JSON Serialization | Tech | High | Python's `json.dumps(sort_keys=True)` must match a deterministic JS equivalent (e.g., `json-stable-stringify`). |
| Vault Availability | Env | Medium | Implement robust fallback to Env vars for air-gapped or non-Vault environments. |

## 7. Verification
- **Unit Tests**: `agents/tests/test_secrets.py`, `backend/src/modules/audit/audit.service.spec.ts`.
- **Manual**: Trigger a review, sign it, then go to Audit dashboard and click "Verify".
- **A11y**: Use `axe-core` or manual Tab navigation check.

## Complexity Assessment
- **Tier**: Moderate
- **Estimated Effort**: 1 day
- **Risk Level**: Low
