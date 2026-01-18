
---

# AGENTS.md

**GovAssist Ethiopia — AGENTS.md (Normative instructions for coding agents & contributors)**  
**Location:** `/AGENTS.md` (root)  
**Purpose:** Provide a predictable, machine-readable place with precise instructions that AI coding agents (Claude Code, Gemini-CLI, Copilot, Cursor, etc.) and human contributors must follow when working on this repository.

> This file follows the AGENTS.md conventions ([https://agents.md/](https://agents.md/)). Agents should also read the closest `AGENTS.md` in the directory tree (nearest-file precedence).

---

## Quick links

- Spec (single source of truth): `/specs/` (HUMAN-OWNED, immutable)
    
- Policy Registry (authoritative rules): `/policy-registry/` (ADMIN ONLY)
    
- Contracts (OpenAPI / JSON Schema / Workflows): `/contracts/` (AI-generated, human-reviewed)
    
- Code (control plane): `/backend/` (NestJS, TypeScript)
    
- Agents (intelligence plane): `/agents/` (Python)
    
- Infra: `/infra/` (k8s, temporal, terraform)
    
- Tests: `/tests/` (integration, contract, E2E)
    

---

## 1 — Why this file exists

AGENTS.md is a **concise single source** for agent-focused instructions so that coding agents can:

- find build/test commands,
    
- obey project conventions,
    
- operate without polluting human docs,
    
- and produce auditable, spec-aligned outputs.
    

Follow the official AGENTS.md guidance ([https://agents.md/](https://agents.md/)) but **adhere to the normative project rules below**.

---

## 2 — Non-negotiable, project-wide rules (HUMAN & AGENT)

1. **SPEC SUPREMACY** — `/specs/` is the single source of truth. Agents must read it before producing work. Agents are forbidden from modifying `/specs/` directly. Any change → Spec Change Request (SCR).
    
2. **NO AUTONOMOUS POLICY CHANGES** — Do not change `/policy-registry/`. Only an approved admin may author/approve YAML policies and playbooks.
    
3. **CONTRACT-FIRST** — Before implementing an API, actor, or workflow, create/update the corresponding contract in `/contracts/` (OpenAPI, JSON Schema, Temporal workflow). Implementation must follow contracts.
    
4. **TESTS-FIRST & TYPE-FIRST** — Generate types and tests before main business logic. Tests must assert contract conformance.
    
5. **SPEC_MISSING** — If behavior is unspecified, return structured `SPEC_MISSING` (see §6) and create an SCR. Do not guess.
    
6. **NO SECRETS IN CODE** — Never write secrets or credentials into repository files. Use Vault placeholders.
    
7. **MASK PII** — Any example data or prompts sent to external services must be anonymized and accompanied by a `pii_map` hashed locally.
    
8. **HUMAN APPROVAL FOR HIGH-RISK** — Any change that affects enforcement, signing, or legal claims requires human approval and HSM signing.
    

---

## 3 — How agents should find context

- Agents MUST read `/specs/` files relevant to the task, then `/contracts/`, then nearest `/AGENTS.md` (nearest-file precedence).
    
- If you are operating in a subpackage (e.g., `backend/apps/api-gateway/`), locate and honor a nested `AGENTS.md` if present — it overrides root for that subtree.
    

---

## 4 — Repo layout (short)

```
/specs/                   # Human authoritative specifications (immutable)
 /001-govassist-ethiopia/
 /.../
/policy-registry/         # Admin-only deterministic rules & playbooks (YAML)
 /addis-ababa/*.yaml
/contracts/               # OpenAPI, JSON Schemas, workflow contracts
/backend/                 # NestJS control-plane (TypeScript)
 /src/
 /tests/
/agents/                  # Python AI agents + Pydantic models
 /src/
  /audit_agent/
  /compliance_agent/
  /cost_control_agent/
  /document_analyzer/
  /human_review_agent/
  /orchestrator/
  /policy_research_agent/
  /portal_connector/
  /procedural_guide/
  /regulation_expert/
  /regulations/
  /safety_agent/
  /vision_router/
 /tests/
/ui/                      # Next.js + Tailwind + cli-tui
 /src/
/infra/                   # Docker / Makefile / k8s manifests
/tests/                   # integration, contract, E2E tests
/AGENTS.md                # this file (root)
/WORKTREES.md             # active agent worktree tracker
```

---

## 5 — Contract-first developer flow (mandatory)

1. **Read** the relevant `/specs/` section(s). Confirm requirements.
    
2. **Author** contract(s) under `/contracts/`:
    
    - OpenAPI for public/HTTP APIs → `/contracts/openapi/`
        
    - JSON Schemas for agent I/O and DTOs → `/contracts/schemas/`
        
    - Temporal workflow contracts/stubs → `/contracts/workflows/`
        
3. **Run contract validation** locally (tooling instructions below).
    
4. **Generate types & tests** from contracts (TypeScript interfaces / Pydantic models).
    
5. **Implement** code in `/backend/` or `/agents/`, referencing contract types.
    
6. **Run unit & contract tests**. All must pass locally before PR.
    
7. **Open PR** with required spec references and tests; CI runs all validations.
    

---

## 6 — `SPEC_MISSING` flow (strict)

If an agent detects missing or ambiguous spec data that prevents safe implementation:

- Produce the **structured JSON** `SPEC_MISSING` artifact and abort code generation.
    
- Create a Spec Change Request (SCR) file under `/specs/scr/` with:
    
    - `spec_sections_checked`
        
    - `missing_items` (path + reason)
        
    - `recommended_questions`
        
- Notify admin (create issue or follow repo notification flow).
    
- Do **not** implement defaults unless the spec explicitly allows safe defaults.
    

**SPEC_MISSING format (example):**

```json
{
  "status": "SPEC_MISSING",
  "spec_sections_checked": ["/specs/workflows.md#document-processing"],
  "missing_items": [
    {"path": "POST /v1/documents body.file.maxSize", "reason": "no limit specified"}
  ],
  "recommended_questions": [
    "What maximum upload size should be enforced for document uploads?"
  ]
}
```

---

## 7 — Output requirements (code/tests/docs)

- **Top-of-file comment** (every generated file) must include:
    
    - Spec section(s) implemented (exact path)
        
    - Generated-by metadata (agent name & prompt id)
        
    - Timestamp
        
    - `SPEC_MISSING` status if applicable
        
    
    ```ts
    // Implements: /specs/workflows.md#document-processing
    // Generated-by: Claude-Code prompt-id: 12345
    // Generated-at: 2026-01-10T12:00:00Z
    ```
    
- **Tests:** Unit & contract tests must accompany code. Put under `/tests/unit/` and `/tests/contracts/`.
    
- **Docs:** If new public endpoints are added, update `/docs/api/` with sample payloads (including `citation_bundle` and `provenance` examples).
    
- **Lint & format:** Generated code must satisfy project linters and formatters (see tools below).
    

---

## 8 — CI & PR rules (agents must produce CI-ready output)

- Agents must generate PRs that pass the following CI checks:
    
    - `contracts:validate` (OpenAPI/Schema validation)
        
    - `lint` (ESLint / Black / Flake8)
        
    - `unit tests`
        
    - `contract tests` (assert schemas)
        
    - `sast` (Snyk/Trivy)
        
    - `spec-immutability` check (PRs touching `/specs/` or `/policy-registry/` are blocked unless SCR included and admin approved)
        
- PR description must include:
    
    - Spec sections implemented (paths)
        
    - Tests added & how to run them locally
        
    - Any `SPEC_MISSING` artifacts and SCR link
        

---

## 9 — Observability & audit hooks (instrumentation)

- All critical code paths must emit structured events via the project `auditClient.emit()` (example in `/backend/libs/audit/`).
    
- Include `x-correlation-id` and Temporal workflow id in logs and traces.
    
- Add Prometheus metrics for latency and error counts on:
    
    - OCR jobs
        
    - Compliance evaluations
        
    - MESOB submissions
        
- All LLM prompts and responses must be logged redacted under `/logs/llm_prompts/redacted/` with `pii_map` hash.
    

---

## 10 — Security & PDPP rules (implementation checks)

- No secrets in repo. Use Vault placeholders `${VAULT_KEY_x}`.
    
- Ensure Safety Agent masks PII before any external call.
    
- Any cloud call that could process PII must include a consent check and `pii_map` hash.
    
- Changes that affect signing or policy enforcement must be human-reviewed and HSM-signed.
    

---

## 11 — Agent prompt templates (canonical, use verbatim)

> Agents must use these templates as the base for any generation tasks. Replace bracketed terms and keep structure.

### Contract generation (Claude/Gemini)

```
You are a senior backend engineer. Read: /specs/<path> and /contracts.
Task: Generate OpenAPI 3.1 YAML for the API described in /specs/<path>.
Constraints:
- Do NOT invent fields.
- If missing, return SPEC_MISSING JSON (see AGENTS.md §6) and create /specs/scr/<id>.json.
- Include JSON schemas under /contracts/schemas/.
Return: YAML only. Prepend comment with spec path implemented.
```

### Agent implementation (Compliance Agent — Claude)

```
You are implementing the Compliance Agent.
Inputs: /contracts/schemas/agents/compliance.schema.json
Constraints:
- Deterministic behavior only; no external web access.
- Reference /policy-registry/ for rules.
- If policy field missing, return SPEC_MISSING.
Outputs:
- Python module with Pydantic models, unit tests, and audit emits.
```

### Boilerplate & refactor (Cursor / Copilot)

- Use to suggest code, but always add top-of-file spec citations and run tests before committing.
    

---

## 12 — Common Commands for Agents

### Backend (NestJS)
- **Install:** `npm install`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test (Unit):** `npm run test`

### Agents (Python)
- **Install:** `pip install -r agents/requirements.txt`
- **Test:** `pytest agents/tests`
- **Lint:** `black agents/src` (if applicable)

### System-wide
- **Infra:** `make -C infra up`

---

## 13 — Tooling & versions (recommended)

- Node.js 18+ / TypeScript 5.x
    
- NestJS 9+ (control plane) — [https://docs.nestjs.com](https://docs.nestjs.com/)
    
- Python 3.10+ / Pydantic v2+
    
- Temporal Server >=1.x and SDKs — [https://docs.temporal.io](https://docs.temporal.io/)
    
- Redis >=6 (BullMQ) — [https://docs.bullmq.io](https://docs.bullmq.io/)
    
- PostgreSQL 14+
    
- Weaviate or Milvus (vector DB)
    
- Tesseract v5 (local OCR)
    
- Prometheus, Grafana, Jaeger (observability)
    
- HashiCorp Vault + HSM for secrets & signing
    

(Agents should check repo `.tool-versions` or `.nvmrc` before generating code.)

---

## 14 — Developer & agent workflow examples (summary)

- **Add API endpoint**
    
    1. Create contract `/contracts/openapi/...`
        
    2. Run `npm run contracts:validate`
        
    3. Generate types, tests
        
    4. Implement controller/service
        
    5. Run `npm run lint && npm run test`
        
    6. Open PR referencing spec path
        
- **Add Agent**
    
    1. Add agent I/O schema `/contracts/schemas/agents/...`
        
    2. Create unit tests fixture under `/tests/fixtures/`
        
    3. Implement agent under `/agents/` with Pydantic models
        
    4. Ensure `auditClient.emit()` usage and metrics
        
    5. PR with tests & documentation
        

---

## 15 — Emergency & escalation

Stop work and create an issue (tag `critical`) + notify admin when:

- Any agent attempts to modify `/specs/` or `/policy-registry/`.
    
- Unmasked PII is found in an LLM prompt or repo.
    
- A proposed change would change enforcement logic without SCR and admin approval.
    
- A legal inconsistency is detected in policies (conflicting precedence without conflict_policy).
    

---

## 16 — Contact & governance

- **Spec & Policy Owner (admin):** you — must approve SCRs and policy changes.
    
- **Security contact:** security@org (for incidents).
    
- **Dev lead:** eng-manager@org (initial dev sign-off and CI overrides).
    

---

## 17 — Local AGENTS.md for subpackages (recommended)

Place a minimal `AGENTS.md` inside major subpackages (e.g., `/backend/AGENTS.md`, `/agents/AGENTS.md`) with:

- package-specific build/test commands
    
- local conventions
    
- override notes for nearest-file precedence
    

---

## 18 — How to update this AGENTS.md

- Only the admin may make authoritative updates to root `AGENTS.md`.
    
- Subpackage `AGENTS.md` files can be updated by maintainers following the same rules.
    
- Suggested changes should be proposed via SCR under `/specs/scr/` and referenced/approved before merge.
    

---

## Closing note

This `AGENTS.md` bridges the official AGENTS.md format and the repository-specific, normative, safety-first rules required for GovAssist Ethiopia. Agents MUST honor it. Humans MUST enforce it in code reviews and CI.

