from textual.widgets import DataTable
from textual import work
from gae_dev_console.api.temporal import temporal_client
from gae_dev_console.screens.workflow_detail import WorkflowDetailScreen

class WorkflowTable(DataTable):
    """Table to display Temporal workflows."""

    def on_mount(self) -> None:
        self.cursor_type = "row"
        self.add_columns("Workflow ID", "Type", "Status", "Start Time")
        self.load_workflows()

    @work(exclusive=True)
    async def load_workflows(self) -> None:
        self.clear()
        workflows = await temporal_client.list_workflows()
        
        # Temporal workflow objects have attributes like id, run_id, workflow_type, status, start_time
        # Adjust access based on exact temporalio object structure
        for wf in workflows:
            # Note: actual attribute access might differ slightly based on SDK version
            # Using safe access for demo
            w_id = getattr(wf, "id", "Unknown")
            w_type = getattr(wf, "workflow_type", "Unknown")
            w_status = getattr(wf, "status", "Unknown")
            w_start = str(getattr(wf, "start_time", ""))
            
            self.add_row(w_id, w_type, str(w_status), w_start, key=w_id)

    def on_data_table_row_selected(self, event: DataTable.RowSelected) -> None:
        row_key = event.row_key.value
        self.app.push_screen(WorkflowDetailScreen(workflow_id=row_key))
