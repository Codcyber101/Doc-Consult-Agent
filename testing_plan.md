# Implementation Plan: Comprehensive Agent Testing

**Branch**: `feat-backend` | **Date**: 2026-01-17
**Goal**: Implement comprehensive unit and integration tests for all newly implemented and updated agents to ensure reliability and correctness.

## 1. Test Strategy
We will use `pytest` and `pytest-asyncio` for testing. External dependencies (Groq API, HTTP endpoints, File System) will be mocked using `unittest.mock`.

## 2. Test Coverage Plan

| Agent | Test File | Key Scenarios |
|-------|-----------|---------------|
| **Cost Control** | `test_cost_control.py` | - Track usage accumulation (daily/session).<br>- Budget enforcement (blocking calls when limit reached).<br>- Rate calculation logic. |
| **Vision Router** | `test_vision_router.py` | - High-confidence local OCR (Tesseract mock).<br>- Low-confidence fallback to Vision LLM (mocked).<br>- Error handling. |
| **Policy Research** | `test_policy_research.py` | - PDF extraction (mocked content).<br>- Allowlist enforcement.<br>- LLM drafting logic (mocked). |
| **Audit Agent** | `test_audit_persistence.py` | - Log file creation and appending.<br>- Signature verification.<br>- JSONL format validity. |
| **Human Review** | `test_human_review.py` | - API submission payload structure.<br>- Error handling (backend down). |
| **Portal Connector** | `test_portal_connector.py` | - HTTP submission to MESOB (mocked).<br>- Fallback/Error handling.<br>- Auth header generation. |
| **Procedural Guide** | `test_procedural_guide.py` | - Playbook loading.<br>- Next step calculation.<br>- Readiness score logic. |
| **Document Analyzer** | `test_document_analyzer.py` | - Field extraction.<br>- Feature detection (stamps/signatures). |
| **Compliance** | `test_compliance_agent.py` | - PASS/FAIL evaluation based on mock LLM response.<br>- JSON parsing resilience. |
| **Regulation Expert** | `test_regulation_expert.py` | - Hybrid retrieval (mocked Weaviate).<br>- Summarization prompt flow. |

## 3. Implementation Steps

### Step 1: Configuration
- Update `agents/pytest.ini` (create if missing) to configure python path and asyncio markers.

### Step 2: Test Implementation (Iterative)
- Create test files in `agents/tests/`.
- Use `patch` to mock `httpx.AsyncClient`, `ChatGroq`, `open` (file I/O), and `pytesseract`.

### Step 3: Execution
- Run `pytest agents/tests/` and verify pass rate.

## 4. Verification
- All tests must pass.
- Coverage should encompass positive and negative paths.
