import pytest
import json
from textual.widgets import Select, TextArea
from gae_dev_console.app import GaeDevConsoleApp

# ----------------------------------------------------------------------------
# Real Data Scenarios (High-Fidelity Mocks)
# ----------------------------------------------------------------------------

SCENARIOS = {
    "policy-research-agent": {
        "input": {
            "query": "requirements for coffee export license",
            "jurisdiction": "federal",
        },
        "response": {
            "status": "completed",
            "draft_policy": {
                "id": "pol_coffee_exp_001",
                "title": "Coffee Export Regulation 2024",
                "rules": [
                    {
                        "id": "r1",
                        "description": "Must have valid trade license from MOTI",
                    },
                    {
                        "id": "r2",
                        "description": "Minimum registered capital of 500,000 ETB",
                    },
                ],
            },
            "source_bundle": [
                {
                    "source": "MOTI Directive 84/2024",
                    "url": "http://moti.gov.et/directives/coffee.pdf",
                    "snippet": "Exporters must demonstrate minimum capital...",
                }
            ],
            "confidence_score": 0.95,
        },
    },
    "compliance-agent": {
        "input": {
            "applicant_data": {
                "name": "Abebe Bikila",
                "age": 17,
                "business_type": "sole_proprietorship",
            },
            "policy_rules": ["min_age_18", "valid_id_provided"],
        },
        "response": {
            "compliant": False,
            "violations": [
                {
                    "rule_id": "min_age_18",
                    "severity": "critical",
                    "message": "Applicant Age (17) is below the minimum required age (18).",
                }
            ],
            "recommendations": ["Wait until 18 or register via guardian"],
            "confidence": 0.99,
        },
    },
    "document-analyzer": {
        "input": {
            "document_text": "FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA\nPASSPORT\nName: Almaz Ayana\nPassport No: EP99887766\nDate of Birth: 12 AUG 1992\nSex: F",
            "expected_type": "passport",
        },
        "response": {
            "document_type": "passport",
            "extracted_fields": {
                "full_name": "Almaz Ayana",
                "passport_number": "EP99887766",
                "dob": "1992-08-12",
                "gender": "Female",
            },
            "verification_checks": {"format_valid": True, "not_expired": True},
            "ocr_confidence": 0.98,
        },
    },
}


@pytest.mark.asyncio
@pytest.mark.parametrize("agent_name", SCENARIOS.keys())
async def test_agent_real_data_interaction(mock_api_client, agent_name):
    """
    Tests the Agent Runner screen with realistic data payloads.
    Since the backend is offline in the CI environment, we populate the
    mock_api_client with the specific high-fidelity response expected
    from the real backend for these inputs.
    """
    scenario = SCENARIOS[agent_name]
    input_payload = scenario["input"]
    expected_response = scenario["response"]

    # Configure the mock to return specific data for this call
    # We use side_effect to check input and return specific output
    async def side_effect(name, payload):
        if name == agent_name and payload == input_payload:
            return expected_response
        return {"error": "Unexpected payload or agent"}

    mock_api_client.trigger_agent.side_effect = side_effect

    app = GaeDevConsoleApp()
    # Use a large screen to ensure all widgets are visible
    async with app.run_test(size=(120, 50)) as pilot:
        # Navigate to Agent Runner
        await pilot.press("a")
        await pilot.pause()

        # 1. Select Agent
        select = app.screen.query_one("#agent-select", Select)
        select.value = agent_name

        # 2. Enter Real JSON Payload
        input_area = app.screen.query_one("#json-input", TextArea)
        input_area.load_text(json.dumps(input_payload, indent=2))

        # 3. Trigger Run
        await pilot.click("#run-btn")
        await pilot.pause()  # Wait for async processing

        # 4. Verify Output
        output_area = app.screen.query_one("#json-output", TextArea)
        output_text = output_area.text

        # Parse output to verify it matches expected structure
        try:
            actual_data = json.loads(output_text)
        except json.JSONDecodeError:
            pytest.fail(f"Output was not valid JSON: {output_text}")

        # Assertions
        assert actual_data == expected_response, f"Failed for {agent_name}"

        # Verify the mock was called with the exact real-world payload
        mock_api_client.trigger_agent.assert_called_with(agent_name, input_payload)
