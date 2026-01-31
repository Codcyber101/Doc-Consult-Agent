import pytest
from gae_dev_console.app import GaeDevConsoleApp
from gae_dev_console.screens.dashboard import DashboardScreen
from gae_dev_console.screens.workflow_inspector import WorkflowInspectorScreen
from gae_dev_console.screens.agent_runner import AgentRunnerScreen


@pytest.mark.asyncio
async def test_app_startup_and_navigation():
    app = GaeDevConsoleApp()
    async with app.run_test() as pilot:
        # Check initial screen is Dashboard
        assert isinstance(app.screen, DashboardScreen)

        # Switch to Workflows using key binding
        await pilot.press("w")
        await pilot.pause()
        assert isinstance(app.screen, WorkflowInspectorScreen)

        # Switch to Agent Runner using key binding
        await pilot.press("a")
        await pilot.pause()
        assert isinstance(app.screen, AgentRunnerScreen)

        # Switch back to Dashboard using key binding
        await pilot.press("d")
        await pilot.pause()
        assert isinstance(app.screen, DashboardScreen)
