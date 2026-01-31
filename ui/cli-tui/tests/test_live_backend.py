import pytest
import json
import os
from textual.widgets import Select, TextArea
from gae_dev_console.app import GaeDevConsoleApp

# ----------------------------------------------------------------------------
# Real Data Scenarios for Live Backend
# ----------------------------------------------------------------------------

SCENARIOS = {
    "compliance-agent": {
        "input": {
            "applicant_data": {"age": 20, "business_type": "sole_proprietorship"}
        },
        "expected_substring": '"compliant": true',
    },
    "policy-research-agent": {
        "input": {"query": "coffee export", "jurisdiction": "federal"},
        "expected_substring": '"status": "completed"',
    },
    "document-analyzer": {
        "input": {
            "document_text": "GOVASSIST ETHIOPIA PASSPORT\nName: Almaz Ayana",
            "expected_type": "passport",
        },
        "expected_substring": '"document_type": "passport"',
    },
}


@pytest.mark.asyncio
@pytest.mark.parametrize("agent_name", SCENARIOS.keys())
async def test_agent_live_interaction(agent_name):
    """
    Tests the Agent Runner screen against the ACTUAL live backend.
    Requires GAE_TEST_LIVE=true and GAE_BACKEND_URL=http://localhost:3001
    """
    if os.getenv("GAE_TEST_LIVE") != "true":
        pytest.skip("Skipping live test. Set GAE_TEST_LIVE=true to run.")

    scenario = SCENARIOS[agent_name]
    input_payload = scenario["input"]

    app = GaeDevConsoleApp()
    async with app.run_test(size=(120, 50)) as pilot:
        await pilot.press("a")
        await pilot.pause()

        # 1. Select Agent
        select = app.screen.query_one("#agent-select", Select)
        select.value = agent_name

        # 2. Enter JSON Payload
        input_area = app.screen.query_one("#json-input", TextArea)
        input_area.load_text(json.dumps(input_payload, indent=2))

        # 3. Trigger Run
        await pilot.click("#run-btn")
        await pilot.pause()
        await pilot.pause()  # Extra pause for network latency

        # 4. Verify Output
        output_area = app.screen.query_one("#json-output", TextArea)
        output_text = output_area.text

        assert scenario["expected_substring"] in output_text, (
            f"Failed for {agent_name}. Output: {output_text}"
        )
        assert "Error" not in output_text
