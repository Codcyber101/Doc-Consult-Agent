# Feature Specification: GAE RAG Agent (Intelligence Plane)

**Feature Branch**: `007-gae-rag-agent`  
**Created**: 2026-01-16  
**Status**: Draft  
**Input**: User description: "@GovAssist Ethiopia (GAE) — Final, Detailed PRD & Technical Specification.md use the PRD to build all agents comprehensively specially the RAG agent for documents processing"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Policy Research & Drafting (Priority: P1)

As an Admin, I want to use the Policy Research Agent (PRA) to automatically research new government directives and generate draft policy YAMLs so that I can quickly update the Policy Registry.

**Why this priority**: This is the "seed" for the entire system's intelligence. Without researched policies, the Compliance Agent has no rules to enforce.

**Independent Test**: Admin submits a research query (e.g., "VAT registration for tech startups in Addis Ababa"). System returns a draft YAML with a source bundle (URLs/snippets).

**Acceptance Scenarios**:

1. **Given** a new proclamation URL or topic, **When** the PRA is triggered, **Then** it must return a draft YAML following the Policy Registry schema.
2. **Given** a generated draft, **When** inspected by an admin, **Then** it must include a `source_bundle` with exact snippets and page numbers for every rule.

---

### User Story 2 - Regulation Guidance (RAG) (Priority: P2)

As a Citizen or SME, I want to ask natural language questions about government procedures and receive summarized answers with legal citations so that I can understand my requirements without reading dense legal text.

**Why this priority**: This provides the primary value to the end-user by translating "legalese" into actionable guidance.

**Independent Test**: User asks "What documents do I need for a trade license in Bole sub-city?". System returns a summary list with citations to the relevant directive.

**Acceptance Scenarios**:

1. **Given** a user query, **When** processed by the RAG agent, **Then** it must retrieve relevant snippets using hybrid (BM25 + vector) search.
2. **Given** a generated summary, **When** displayed to the user, **Then** every claim must have a clickable citation linking to the source document.

---

### User Story 3 - Citation Auditing & Safety (Priority: P3)

As a System Auditor, I want to ensure that all AI-generated guidance is strictly backed by source text and that no sensitive information is leaked to external providers.

**Why this priority**: Ensures the "sovereign-first" and "abstention over hallucination" principles of GAE.

**Independent Test**: Audit a RAG session to verify PII masking occurred and the Citation Auditor validated all claims.

**Acceptance Scenarios**:

1. **Given** a query containing PII (e.g., a TIN number), **When** sent to a cloud LLM, **Then** the Safety Agent must mask the PII before transmission.
2. **Given** a RAG summary, **When** the Citation Auditor finds a claim not supported by retrieved snippets, **Then** the system must flag the claim as "Unverified" or remove it.

---

### Edge Cases

- **Conflicting Regulations**: How does the system handle cases where a directive contradicts a proclamation? (Requirement: System must flag conflict and prioritize based on legal hierarchy).
- **No Results Found**: How does the system handle queries for which no relevant regulations exist in the registry or allowlist? (Requirement: System must explicitly state no information was found rather than guessing).
- **Blurry/Illegible Sources**: How does the PRA handle OCR failures in source PDFs? (Requirement: Flag source as "Low Quality" and request human review).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST perform hybrid search (BM25 for keywords + Vector for semantics) against the Regulation database.
- **FR-002**: System MUST use a domain allowlist for all web-based research, including official government portals (e.g., nbe.gov.et) and reputable legal aggregators (e.g., ethiopian-law.com).
- **FR-003**: System MUST generate "Source Bundles" containing the document ID, page number, and text snippet for every claim made.
- **FR-004**: System MUST support "Masked Input" for RAG queries to prevent PII leakage to cloud providers.
- **FR-005**: The PRA MUST produce outputs in valid YAML format compatible with the GAE Policy Registry schema.
- **FR-006**: System MUST compute a "Confidence Score" (0.0 - 1.0) for every retrieved snippet and generated summary.
- **FR-007**: The Citation Auditor MUST cross-reference generated summaries against source snippets and reject hallucinations.
- **FR-008**: System MUST escalate RAG responses to human review if the confidence score falls below **0.70**.
- **FR-009**: In cases of regulatory conflict, the system MUST prioritize the higher-level legal authority (Federal Proclamation > Regional Directive) as the primary truth.

### Key Entities *(include if feature involves data)*

- **Policy Draft**: A temporary YAML structure representing researched rules, waiting for Admin approval.
- **Regulation Snippet**: A discrete block of legal text with associated metadata (Proclamation ID, Page, Version).
- **Source Bundle**: A collection of Regulation Snippets used to justify a specific guidance response or policy rule.
- **Citation**: A verified link between a statement and a specific Regulation Snippet.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of claims in RAG summaries MUST have at least one verified citation from the Regulation database.
- **SC-002**: RAG retrieval and summarization (masked) MUST complete in under 5 seconds for 95% of queries.
- **SC-003**: 0% PII leakage to non-sovereign zones (verified by automated safety audit).
- **SC-004**: PRA must successfully generate a valid Policy Registry YAML draft for 90% of unambiguous research queries.
- **SC-005**: Citation Auditor must detect and block at least 99% of "out-of-context" or hallucinated claims during internal testing.