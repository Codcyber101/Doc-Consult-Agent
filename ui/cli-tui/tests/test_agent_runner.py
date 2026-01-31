import pytest
import json
from gae_dev_console.app import GaeDevConsoleApp
from textual.widgets import Select, TextArea


@pytest.mark.asyncio
async def test_agent_runner_success(mock_api_client):
    mock_api_client.trigger_agent.return_value = {
        "result": "Agent processed successfully"
    }

    app = GaeDevConsoleApp()
    async with app.run_test(size=(120, 40)) as pilot:
        await pilot.press("a")
        await pilot.pause()

        # Select an agent
        # Note: Testing Select widget programmatically in Textual
        select = app.screen.query_one("#agent-select", Select)
        select.value = "compliance-agent"

        # Set input JSON
        input_area = app.screen.query_one("#json-input", TextArea)
        input_area.load_text('{"foo": "bar"}')

        # Click Run
        await pilot.click("#run-btn")
        await pilot.pause()  # Wait for on_button_pressed worker

        # Check output
        output_area = app.screen.query_one("#json-output", TextArea)
        output_text = output_area.text
        data = json.loads(output_text)
        assert data["result"] == "Agent processed successfully"

        # Verify API call
        mock_api_client.trigger_agent.assert_called_with(
            "compliance-agent", {"foo": "bar"}
        )


@pytest.mark.asyncio
async def test_agent_runner_invalid_json(mock_api_client):
    app = GaeDevConsoleApp()
    async with app.run_test(size=(120, 40)) as pilot:
        await pilot.press("a")
        await pilot.pause()

        select = app.screen.query_one("#agent-select", Select)
        select.value = "compliance-agent"

        input_area = app.screen.query_one("#json-input", TextArea)
        input_area.load_text("{invalid json")

        await pilot.click("#run-btn")
        await pilot.pause()

        output_area = app.screen.query_one("#json-output", TextArea)
        assert "Error: Invalid JSON input" in output_area.text

        mock_api_client.trigger_agent.assert_not_called()


@pytest.mark.asyncio
async def test_agent_runner_no_agent_selected(mock_api_client):
    app = GaeDevConsoleApp()
    async with app.run_test(size=(120, 40)) as pilot:
        await pilot.press("a")
        await pilot.pause()

        # Don't select agent (default is Select.BLANK)

        await pilot.click("#run-btn")
        await pilot.pause()

        output_area = app.screen.query_one("#json-output", TextArea)
        assert "Error: Please select an agent" in output_area.text
