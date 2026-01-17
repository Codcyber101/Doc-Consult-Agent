# Specification: Developer Console (TUI/CLI)

**Feature**: Developer Console
**Status**: Draft
**Owner**: Admin

## 1. Overview
The Developer Console is a terminal-based interface (TUI) accompanied by a CLI entry point. It serves as the primary tool for developers and administrators to inspect, debug, and manage the GovAssist Ethiopia platform's internal state, specifically focusing on Temporal workflows and Agent interactions.

## 2. User Stories
- **US-1**: As a developer, I want to view the health status of all major system components (Backend, Temporal, Agents) in a single dashboard so I can quickly identify outages.
- **US-2**: As a developer, I want to list active and completed workflows to debug issues with specific user requests.
- **US-3**: As a developer, I want to trigger specific agents (e.g., Policy Research Agent) with custom JSON inputs to verify their behavior in isolation.
- **US-4**: As a developer, I want to view system logs in real-time within the console to avoid switching context.
- **US-5**: As a developer, I want to operate this tool locally without exposing it to the public internet.

## 3. User Interface (TUI)
The TUI will be built using **Textual** and organized into the following screens:

### 3.1 Main Layout
- **Header**: Title, Current Environment (Dev/Prod), User status.
- **Sidebar**: Navigation menu (Dashboard, Workflows, Agents, Logs).
- **Content Area**: Dynamic content based on selection.
- **Footer**: Key bindings and status messages.

### 3.2 Screens
- **Dashboard**: High-level metrics (e.g., "Active Workflows: 12", "Error Rate: 0%").
- **Workflow Inspector**:
    - Table view of workflows (ID, Type, Status, Start Time).
    - Detail view showing history/events of a selected workflow.
- **Agent Runner**:
    - Dropdown to select Agent.
    - Text area (with syntax highlighting) for JSON input.
    - "Run" button.
    - Output area for Agent response/logs.
- **Logs**:
    - Rolling log viewer.
    - Search/Filter inputs.

## 4. CLI Commands
The CLI (powered by `Typer`) will provide quick access to specific functions without entering the full TUI:
- `gae-dev tui`: Launch the TUI.
- `gae-dev status`: Print system health check.
- `gae-dev workflow list`: List recent workflows.
- `gae-dev agent run <agent_name> --input <file.json>`: Execute an agent one-off.

## 5. Security & Access
- The tool connects using Admin credentials.
- It is intended for local usage or usage within a secure bastion host.
- It bypasses standard user rate limits but respects PII masking rules unless explicitly overridden with high-privilege keys.
