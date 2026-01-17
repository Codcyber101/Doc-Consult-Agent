# Developer Console (TUI) User Guide

**Version:** 1.0  
**Target Audience:** Developers, QA Engineers, DevOps  
**Command:** `gae-dev`

---

## 1. Overview

The **GovAssist Ethiopia Developer Console** is a terminal-based "Command Center" designed to give you direct visibility into the "Intelligence Plane" (AI Agents) and the "Reliability Plane" (Temporal Workflows) of the system.

Unlike the main web UI, which is designed for citizens, this tool is designed for **you**—to debug, trace, and evaluate the system internals without needing to look at raw database tables or grep through log files.

### Key Capabilities
*   **System Health:** Instant "Red/Green" status of core services.
*   **Workflow Tracing:** View real-time status of document processing flows.
*   **Agent Evaluation:** "Sandboxed" testing of individual AI agents with custom JSON inputs.
*   **Log Observation:** (Planned) Real-time streaming of system logs.

---

## 2. Installation & Setup

### Prerequisites
*   Python 3.11+
*   Access to the local dev environment (Backend running on `localhost:3000`, Temporal on `localhost:7233`).

### Installation
Run this command from the project root:

```bash
cd ui/cli-tui
pip install -e .
```

*Note: If you are developing the TUI itself, install dev dependencies:*
```bash
pip install -e ".[dev]"
```

---

## 3. Quick Start

### 3.1 Check System Status (CLI Mode)
For a quick health check without launching the full UI:

```bash
gae-dev status
```

**Output:**
```text
GovAssist Developer Console
Environment: development
Backend URL: http://localhost:3000
Temporal URL: localhost:7233
```

### 3.2 Launch the TUI
To open the interactive interface:

```bash
gae-dev tui
```

---

## 4. Navigation & Screens

Once inside the TUI, you can navigate using **Keyboard Shortcuts** (displayed in the footer) or your mouse.

| Key | Action |
| :--- | :--- |
| **D** | Switch to **Dashboard** |
| **W** | Switch to **Workflows** |
| **A** | Switch to **Agent Runner** |
| **Q** | **Quit** the application |

### 4.1 Dashboard (Home)
**Purpose:** High-level system health monitoring.

*   **Service Status:**
    *   **Backend API:** Checks connectivity to the NestJS Control Plane.
    *   **Temporal:** Checks connectivity to the Temporal Orchestrator.
*   **Indicators:**
    *   <span style="color:green">**ONLINE (Green)**</span>: Service is healthy and responding.
    *   <span style="color:red">**OFFLINE (Red)**</span>: Connection failed. Check your Docker containers.

### 4.2 Workflow Inspector
**Purpose:** Trace the execution of long-running processes (e.g., "Trade License Renewal").

*   **List View:**
    *   Displays a real-time table of workflows fetched from Temporal.
    *   **Columns:** `Workflow ID`, `Type`, `Status` (Running/Completed/Failed), `Start Time`.
    *   **Action:** Use `Up/Down` arrow keys to highlight a workflow. Press `Enter` to view details.
    *   **Refresh:** Press `R` to reload the list.

*   **Detail View:**
    *   Shows the specific `Run ID` and execution history of the selected workflow.
    *   *Debugging Tip:* Use this to see exactly where a workflow is stuck (e.g., "Waiting for Human Review" or "Retrying OCR").
    *   **Back:** Press `Escape` to return to the list.

### 4.3 Agent Runner
**Purpose:** Test and evaluate AI agents in isolation. This is critical for Prompt Engineering and regression testing.

*   **Workflow:**
    1.  **Select Agent:** Press `Tab` to focus the dropdown, then use `Up/Down` to select an agent (e.g., `compliance-agent`).
    2.  **Input Payload:** Press `Tab` to focus the "Input Payload" text area. Paste or type your JSON test data.
        *   *Example:* `{"text": "Passport expires 2020", "rules": ["Must be valid"]}`
    3.  **Run:** Tab to the **Run Agent** button and press `Enter` (or click it).
    4.  **Analyze Output:** The JSON response from the agent will appear in the "Output" pane on the right.

---

## 5. Configuration

The console reads configuration from the environment variables (or `.env` file in `ui/cli-tui/.env`).

| Variable | Default | Description |
| :--- | :--- | :--- |
| `GAE_BACKEND_URL` | `http://localhost:3000` | URL of the NestJS API Gateway |
| `TEMPORAL_URL` | `localhost:7233` | Address of the Temporal Frontend Service |
| `GAE_ENV` | `development` | Environment label (dev/prod) |

---

## 6. Troubleshooting

**Issue: "Connection Refused" on Dashboard**
*   **Fix:** Ensure your backend services are running.
    *   Run `docker ps` to verify `gae-backend` and `temporal` containers are up.

**Issue: "ModuleNotFoundError: No module named 'gae_dev_console'**
*   **Fix:** Ensure you installed the package in editable mode (`pip install -e .`) and are running `gae-dev` from the active virtual environment.

**Issue: TUI looks broken (rendering issues)**
*   **Fix:** Textual requires a terminal with UTF-8 and 256-color support. Try resizing your terminal window or using a standard terminal like `gnome-terminal`, `iTerm2`, or VS Code Integrated Terminal.
