import pytest
from unittest.mock import patch, AsyncMock
import json
from src.compliance_agent.evaluator import ComplianceAgent
from langchain_core.outputs import ChatResult, ChatGeneration
from langchain_core.messages import AIMessage

@pytest.fixture
def compliance_agent():
    return ComplianceAgent()

@pytest.mark.asyncio
async def test_compliance_evaluate_pass(compliance_agent):
    extracted_data = {"masked_text": "License is valid."}
    regulations = [{"id": "reg1", "content": "License must be valid."}]
    
    # Create a proper ChatResult for the mock
    content = json.dumps({
        "status": "PASS",
        "findings": [{"rule_id": "reg1", "result": "PASS", "reason": "Valid found"}]
    })
    mock_message = AIMessage(content=content)
    mock_result = ChatResult(generations=[ChatGeneration(message=mock_message)], llm_output={"token_usage": {}})
    
    # Patch _agenerate instead of ainvoke to avoid Pydantic issues
    with patch.object(compliance_agent.llm, "_agenerate", AsyncMock(return_value=mock_result)):
        result = await compliance_agent.evaluate(extracted_data, regulations)
        
        assert result["status"] == "PASS"
        assert len(result["findings"]) == 1
        assert result["findings"][0]["result"] == "PASS"

@pytest.mark.asyncio
async def test_compliance_evaluate_fail(compliance_agent):
    extracted_data = {"masked_text": "License expired."}
    regulations = [{"id": "reg1", "content": "License must be valid."}]
    
    content = json.dumps({
        "status": "FAIL",
        "findings": [{"rule_id": "reg1", "result": "FAIL", "reason": "Expired"}]
    })
    mock_message = AIMessage(content=content)
    mock_result = ChatResult(generations=[ChatGeneration(message=mock_message)], llm_output={"token_usage": {}})
    
    with patch.object(compliance_agent.llm, "_agenerate", AsyncMock(return_value=mock_result)):
        result = await compliance_agent.evaluate(extracted_data, regulations)
        
        assert result["status"] == "FAIL"
        assert result["findings"][0]["result"] == "FAIL"

@pytest.mark.asyncio
async def test_compliance_parse_error(compliance_agent):
    extracted_data = {"masked_text": "..."}
    
    mock_message = AIMessage(content="not json")
    mock_result = ChatResult(generations=[ChatGeneration(message=mock_message)], llm_output={"token_usage": {}})
    
    with patch.object(compliance_agent.llm, "_agenerate", AsyncMock(return_value=mock_result)):
        result = await compliance_agent.evaluate(extracted_data, [])
        
        assert result["status"] == "MANUAL_REVIEW"
        assert result["findings"][0]["rule_id"] == "system"