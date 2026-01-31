import pytest
from unittest.mock import MagicMock
from gae_dev_console.app import GaeDevConsoleApp
from gae_dev_console.widgets.workflows import WorkflowTable
from gae_dev_console.screens.workflow_detail import WorkflowDetailScreen


class MockWorkflow:
    def __init__(self, id, type, status, start_time):
        self.id = id
        self.workflow_type = type
        self.status = status
        self.start_time = start_time


@pytest.mark.asyncio
async def test_workflow_list_population(mock_temporal_client):
    # Setup mock data
    mock_temporal_client.list_workflows.return_value = [
        MockWorkflow("wf-1", "LicenseRenew", "Running", "2023-01-01"),
        MockWorkflow("wf-2", "PermitRequest", "Completed", "2023-01-02"),
    ]

    app = GaeDevConsoleApp()
    async with app.run_test() as pilot:
        # Navigate to workflows
        await pilot.press("w")
        await pilot.pause()  # Wait for screen switch
        await pilot.pause()  # Wait for load_workflows worker

        table = app.screen.query_one(WorkflowTable)
        assert table.row_count == 2

        # Check first row data
        row1 = table.get_row("wf-1")
        assert row1[0] == "wf-1"
        assert row1[1] == "LicenseRenew"
        assert row1[2] == "Running"


@pytest.mark.asyncio
async def test_workflow_selection_opens_detail(mock_temporal_client):
    mock_temporal_client.list_workflows.return_value = [
        MockWorkflow("wf-1", "LicenseRenew", "Running", "2023-01-01")
    ]
    # We also need to mock get_workflow_handle used in Detail screen,
    # but let's just check if screen is pushed.

    # Mocking detail screen dependencies if needed.
    # WorkflowDetailScreen uses temporal_client.get_workflow_handle.
    # It probably also calls describe() on the handle.
    mock_handle = MagicMock()
    mock_handle.describe = MagicMock()  # Needs to be async?
    # Actually temporalio client calls are async.
    # Let's check WorkflowDetailScreen implementation if possible, or assume it needs async mocks.

    # For now, let's just see if we can select the row.

    app = GaeDevConsoleApp()
    async with app.run_test() as pilot:
        await pilot.press("w")
        await pilot.pause()
        await pilot.pause()

        table = app.screen.query_one(WorkflowTable)

        # Select the row.
        # Programmatically selecting row:
        table.move_cursor(row=0)
        await pilot.press("enter")

        # Check if detail screen is pushed
        assert isinstance(app.screen, WorkflowDetailScreen)
        assert app.screen.workflow_id == "wf-1"
