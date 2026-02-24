import pytest
from unittest.mock import patch, AsyncMock
import json
from compliance_agent.evaluator import ComplianceAgent
from compliance_agent.engine import deterministic_engine
from langchain_core.outputs import ChatResult, ChatGeneration
from langchain_core.messages import AIMessage


@pytest.fixture
def compliance_agent():
    return ComplianceAgent()


@pytest.mark.asyncio
async def test_compliance_evaluate_pass(compliance_agent):
    extracted_data = {
        "masked_text": "License is valid.",
        "documents": [
            "Original Trade License",
            "TIN Certificate",
            "Lease Agreement (valid)",
        ],
    }
    regulations = [{"id": "reg1", "content": "License must be valid."}]
    playbook = {
        "service_type": "TRADE_LICENSE_RENEWAL",
        "steps": [
            {
                "requirements": [
                    "Original Trade License",
                    "TIN Certificate",
                    "Lease Agreement (valid)",
                ]
            },
        ],
    }

    # Create a proper ChatResult for the mock
    content = json.dumps(
        {
            "status": "PASS",
            "findings": [
                {"rule_id": "reg1", "result": "PASS", "reason": "Valid found"}
            ],
        }
    )
    mock_message = AIMessage(content=content)
    mock_result = ChatResult(
        generations=[ChatGeneration(message=mock_message)],
        llm_output={"token_usage": {}},
    )

    # Patch _agenerate instead of ainvoke to avoid Pydantic issues
    with patch.object(
        compliance_agent.llm, "_agenerate", AsyncMock(return_value=mock_result)
    ):
        result = await compliance_agent.evaluate(
            extracted_data, regulations, playbook=playbook
        )

        assert result["status"] == "PASS"
        assert len(result["findings"]) == 1
        assert result["findings"][0]["result"] == "PASS"
        assert result["readiness_score"] == 100


@pytest.mark.asyncio
async def test_compliance_evaluate_fail(compliance_agent):
    extracted_data = {
        "masked_text": "License expired.",
        "documents": ["Original Trade License"],
    }
    regulations = [{"id": "reg1", "content": "License must be valid."}]
    playbook = {
        "service_type": "TRADE_LICENSE_RENEWAL",
        "steps": [
            {
                "requirements": [
                    "Original Trade License",
                    "TIN Certificate",
                    "Lease Agreement (valid)",
                ]
            },
        ],
    }

    content = json.dumps(
        {
            "status": "FAIL",
            "findings": [{"rule_id": "reg1", "result": "FAIL", "reason": "Expired"}],
        }
    )
    mock_message = AIMessage(content=content)
    mock_result = ChatResult(
        generations=[ChatGeneration(message=mock_message)],
        llm_output={"token_usage": {}},
    )

    with patch.object(
        compliance_agent.llm, "_agenerate", AsyncMock(return_value=mock_result)
    ):
        result = await compliance_agent.evaluate(
            extracted_data, regulations, playbook=playbook
        )

        assert result["status"] == "FAIL"
        assert result["findings"][0]["result"] == "FAIL"


@pytest.mark.asyncio
async def test_compliance_parse_error(compliance_agent):
    extracted_data = {"masked_text": "...", "documents": []}
    playbook = {
        "service_type": "TRADE_LICENSE_RENEWAL",
        "steps": [
            {"requirements": ["Original Trade License"]},
        ],
    }

    mock_message = AIMessage(content="not json")
    mock_result = ChatResult(
        generations=[ChatGeneration(message=mock_message)],
        llm_output={"token_usage": {}},
    )

    with patch.object(
        compliance_agent.llm, "_agenerate", AsyncMock(return_value=mock_result)
    ):
        result = await compliance_agent.evaluate(extracted_data, [], playbook=playbook)
        assert result["status"] == "UNCERTAIN"
        assert result["findings"][0]["rule_id"] == "system"


def test_deterministic_engine_missing_docs_sets_fail():
    playbook = {
        "service_type": "TRADE_LICENSE_RENEWAL",
        "steps": [{"requirements": ["Original Trade License", "TIN Certificate"]}],
    }
    report = deterministic_engine.evaluate_trade_license_renewal(
        {"documents": ["Original Trade License"]}, playbook
    )
    assert report["status"] == "FAIL"
    assert report["readiness_score"] < 100
