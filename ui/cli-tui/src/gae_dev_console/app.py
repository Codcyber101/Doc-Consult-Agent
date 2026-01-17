from textual.app import App, ComposeResult
from textual.widgets import Header, Footer
from gae_dev_console.screens.dashboard import DashboardScreen
from gae_dev_console.screens.workflow_inspector import WorkflowInspectorScreen
from gae_dev_console.screens.agent_runner import AgentRunnerScreen
from gae_dev_console.config import config

class GaeDevConsoleApp(App):
    """A Textual app for GovAssist Ethiopia Developer Console."""

    CSS_PATH = "app.tcss"
    BINDINGS = [
        ("d", "switch_screen('dashboard')", "Dashboard"),
        ("w", "switch_screen('workflows')", "Workflows"),
        ("a", "switch_screen('agent_runner')", "Agents"),
        ("q", "quit", "Quit"),
    ]

    def compose(self) -> ComposeResult:
        """Create child widgets for the app."""
        yield Header()
        yield Footer()

    def on_mount(self) -> None:
        """Called when app starts."""
        self.install_screen(DashboardScreen(), name="dashboard")
        self.install_screen(WorkflowInspectorScreen(), name="workflows")
        self.install_screen(AgentRunnerScreen(), name="agent_runner")
        self.push_screen("dashboard")

def run():
    app = GaeDevConsoleApp()
    app.run()

if __name__ == "__main__":
    run()
