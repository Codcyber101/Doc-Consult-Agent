from textual.app import ComposeResult
from textual.screen import Screen
from textual.widgets import Header, Footer, Static, Log
from textual.containers import Container
from gae_dev_console.api.temporal import temporal_client
from textual import work


class WorkflowDetailScreen(Screen):
    """Screen for viewing details of a specific workflow."""

    BINDINGS = [
        ("escape", "app.pop_screen", "Back"),
    ]

    def __init__(self, workflow_id: str, **kwargs):
        super().__init__(**kwargs)
        self.workflow_id = workflow_id

    def compose(self) -> ComposeResult:
        yield Header()
        yield Container(
            Static(f"Workflow Details: {self.workflow_id}", classes="screen-title"),
            Static("Loading details...", id="detail-status"),
            Log(id="workflow-log"),
        )
        yield Footer()

    def on_mount(self) -> None:
        self.load_details()

    @work(exclusive=True)
    async def load_details(self) -> None:
        # Mock implementation for now as actual history fetching is complex
        log = self.query_one(Log)
        status = self.query_one("#detail-status", Static)

        try:
            handle = await temporal_client.get_workflow_handle(self.workflow_id)
            # In a real app, we would fetch history events here
            status.update(f"ID: {handle.id}\nRun ID: {handle.run_id}")
            log.write_line("Fetching history not yet implemented.")
        except Exception as e:
            status.update(f"Error: {str(e)}")
