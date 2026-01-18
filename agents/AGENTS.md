# AGENTS.md (Agents Subpackage)

**Role:** Python-based AI Agents & Intelligence Plane
**Parent:** `/AGENTS.md` (Inherits all normative rules)

---

## Local Commands

- **Install dependencies:** `pip install -r requirements.txt`
- **Run tests:** `pytest tests/`
- **Run specific test:** `pytest tests/test_compliance_agent.py`
- **Run worker:** `python src/main.py`

---

## Conventions

- **Models:** Use Pydantic v2 for all I/O and configuration.
- **Orchestration:** Use LangGraph for agent workflows and Temporal for long-running processes.
- **Context:** Always reference `/specs/` for agent behavior definitions.
- **Contracts:** Use Pydantic models generated from or aligned with `/contracts/schemas/`.

---

## Directory Structure

- `src/`: Agent implementations (one directory per agent).
- `tests/`: Pytest suite.
- `requirements.txt`: Python dependencies.
