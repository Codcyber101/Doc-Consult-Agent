# GovAssist Ethiopia - Developer Console (TUI/CLI)

This is a Terminal User Interface (TUI) and Command Line Interface (CLI) tool for developers and administrators to inspect, debug, and manage the GovAssist Ethiopia platform.

## Features
- **Dashboard**: View system status.
- **Workflow Inspector**: Monitor Temporal workflows.
- **Agent Runner**: Trigger and test AI agents.
- **Logs**: View real-time system logs.

## Installation

```bash
cd ui/cli-tui
pip install -e .
```

## Usage

### CLI
Check status:
```bash
gae-dev status
```

Launch TUI:
```bash
gae-dev tui
```

### Development
Install dev dependencies:
```bash
pip install -e ".[dev]"
```

Run tests:
```bash
pytest
```
