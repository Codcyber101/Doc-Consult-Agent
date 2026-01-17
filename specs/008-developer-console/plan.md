# Implementation Plan: Developer Console (TUI)

**Branch**: `008-developer-console` | **Date**: 2026-01-17 | **Spec**: [specs/008-developer-console/spec.md](./spec.md)
**Input**: Feature specification from `GovAssist Ethiopia (GAE) — Final, Detailed PRD & Technical Specification.md`

## Summary

Implement the Developer Console, a Terminal User Interface (TUI) and Command Line Interface (CLI) tool designed for developers and administrators to interact with the GovAssist Ethiopia (GAE) platform. This tool will facilitate workflow inspection, agent testing, log monitoring, and system status checks, operating separately from the main user-facing interfaces.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: 
- `textual`: TUI framework
- `rich`: Rich text formatting
- `typer`: CLI entry point
- `aiohttp` / `httpx`: Async HTTP client for API interaction
- `temporalio`: Optional direct connection to Temporal (or via API)
**Target Platform**: Linux/macOS/Windows Terminals
**Project Type**: Python Application (CLI/TUI)
**Performance Goals**: Responsive UI (<100ms interaction), efficient log streaming.
**Constraints**: Admin-only access, strictly separated from production user traffic.

## Constitution Check

- **Code Quality**: Python 3.11 with strict type hints (mypy). 
- **Testing**: Pytest for unit tests of CLI commands and TUI logic.
- **UX**: Keyboard-centric navigation, clear visual hierarchy using Textual widgets.
- **Security**: Local execution, requires admin credentials/config to connect to backend/temporal.

## Project Structure

### Documentation (this feature)

```text
specs/008-developer-console/
├── plan.md              # This file
├── spec.md              # Detailed feature spec (to be created)
└── tasks.md             # Implementation tasks (to be created)
```

### Source Code (repository root)

```text
ui/
└── cli-tui/
    ├── src/
    │   ├── app.py           # Main TUI Application
    │   ├── cli.py           # Typer Entry Point
    │   ├── config.py        # Configuration loading
    │   ├── screens/         # TUI Screens
    │   │   ├── dashboard.py
    │   │   ├── workflow_inspector.py
    │   │   ├── agent_runner.py
    │   │   └── logs.py
    │   └── widgets/         # Reusable Widgets
    ├── tests/               # Tests
    ├── pyproject.toml       # Dependency management (or requirements.txt)
    └── README.md
```

## Implementation Phases

### Phase 1: Foundation & Scaffold
- Initialize `ui/cli-tui` directory structure.
- Set up Python environment and dependencies (`textual`, `typer`).
- Create a "Hello World" TUI with a basic layout (Header, Footer, Sidebar, Content Area).
- Implement CLI entry point with `typer`.

### Phase 2: Configuration & API Client
- Implement configuration loading (env vars, config file) for API endpoints (Temporal, Backend).
- Create an async API client service to communicate with the GAE Backend and Temporal.

### Phase 3: Dashboard & System Status
- Implement the "Dashboard" screen.
- Fetch and display system health status (e.g., Backend connectivity, Temporal status).
- Display summary metrics (active workflows, queue depth).

### Phase 4: Workflow Inspector
- Implement the "Workflow Inspector" screen.
- List recent Temporal workflows with status filtering.
- Detail view for a selected workflow (history, current state).

### Phase 5: Agent Runner
- Implement the "Agent Runner" screen.
- Form input to construct payloads for specific agents (e.g., PRA, Compliance).
- Invoke agents (via Backend API) and display results/logs in real-time.

### Phase 6: Log Viewer
- Implement a "Log Viewer" screen.
- Connect to log stream (or mock for now if log aggregation isn't ready).
- Filter/Search logs.

### Phase 7: Polish & Documentation
- Refine UI styling (CSS/TCSS).
- Add keyboard shortcuts.
- Write README and usage guide.
