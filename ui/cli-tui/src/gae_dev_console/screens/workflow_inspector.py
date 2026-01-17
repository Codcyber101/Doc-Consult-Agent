from textual.app import ComposeResult
from textual.screen import Screen
from textual.widgets import Header, Footer, Static
from textual.containers import Container

from gae_dev_console.widgets.workflows import WorkflowTable

class WorkflowInspectorScreen(Screen):
    """Screen for inspecting Temporal workflows."""
    
    BINDINGS = [
        ("r", "refresh_table", "Refresh"),
    ]

    def compose(self) -> ComposeResult:
        yield Header()
        yield Container(
            Static("Workflow Inspector", classes="screen-title"),
            WorkflowTable(id="workflow-table"),
        )
        yield Footer()

    def action_refresh_table(self) -> None:
        table = self.query_one(WorkflowTable)
        table.load_workflows()
