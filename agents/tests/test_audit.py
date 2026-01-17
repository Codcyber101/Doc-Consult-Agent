import pytest
import os
from src.common.safety import SafetyAgent
from src.regulation_expert.summarization import RAGSummarizer
from src.common.citation import CitationAuditor
from unittest.mock import MagicMock, AsyncMock, patch
from langchain_core.outputs import ChatResult, ChatGeneration
from langchain_core.messages import AIMessage

def test_safety_audit_logging():
    agent = SafetyAgent()
    if os.path.exists("pii_audit.log"):
        os.remove("pii_audit.log")
        
    agent.audit_log("Secret TIN 123", "Secret TIN <REDACTED>")
    assert os.path.exists("pii_audit.log")
    with open("pii_audit.log", "r") as f:
        content = f.read()
        assert "<REDACTED>" in content

@pytest.mark.asyncio
async def test_escalation_logic():
    safety = SafetyAgent()
    auditor = CitationAuditor()
    summarizer = RAGSummarizer(safety, auditor)
    
    # Mock LLM response for low confidence
    mock_message = AIMessage(content="I am not sure.")
    mock_result = ChatResult(generations=[ChatGeneration(message=mock_message)], llm_output={"token_usage": {}})
    
    with patch.object(summarizer.llm, "_agenerate", AsyncMock(return_value=mock_result)):
        # Low confidence scenario (empty snippets)
        result = await summarizer.summarize("Question", [])
        assert result["escalated_to_human"] is True
