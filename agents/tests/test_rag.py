import pytest
from unittest.mock import patch, AsyncMock
from src.regulation_expert.summarization import RAGSummarizer
from src.common.safety import SafetyAgent
from src.common.citation import CitationAuditor
from langchain_core.outputs import ChatResult, ChatGeneration
from langchain_core.messages import AIMessage

@pytest.fixture
def rag_summarizer():
    safety = SafetyAgent()
    auditor = CitationAuditor()
    return RAGSummarizer(safety, auditor)

@pytest.mark.asyncio
async def test_rag_summarization_flow(rag_summarizer):
    query = "What is the VAT rate?"
    snippets = [{"id": "s1", "content": "VAT is 15%", "document_id": "PROC-1"}]
    
    # Mock LLM
    mock_message = AIMessage(content="According to [Source 0], the VAT rate is 15%.")
    mock_result = ChatResult(generations=[ChatGeneration(message=mock_message)], llm_output={"token_usage": {}})
    
    with patch.object(rag_summarizer.llm, "_agenerate", AsyncMock(return_value=mock_result)):
        result = await rag_summarizer.summarize(query, snippets)
        
        assert "VAT rate is 15%" in result["summary"]
        assert len(result["citations"]) > 0
        assert result["confidence_score"] > 0.7

@pytest.mark.asyncio
async def test_rag_pii_masking_in_summarization(rag_summarizer):
    query = "My email is test@example.com, tell me about taxes"
    snippets = [{"id": "s1", "content": "Taxes are mandatory.", "document_id": "PROC-1"}]
    
    mock_message = AIMessage(content="Information about taxes.")
    mock_result = ChatResult(generations=[ChatGeneration(message=mock_message)], llm_output={"token_usage": {}})
    
    with patch.object(rag_summarizer.llm, "_agenerate", AsyncMock(return_value=mock_result)) as mock_gen:
        await rag_summarizer.summarize(query, snippets)
        
        # Verify the query passed to LLM was masked
        # Get the call args of _agenerate
        messages = mock_gen.call_args[0][0]
        # The prompt is constructed using ChatPromptTemplate
        # We can check the content of the human message
        human_msg = messages[-1].content
        assert "test@example.com" not in human_msg
        assert "<EMAIL_REDACTED>" in human_msg

@pytest.mark.asyncio
async def test_rag_low_confidence_missing_snippets(rag_summarizer):
    mock_message = AIMessage(content="I don't know.")
    mock_result = ChatResult(generations=[ChatGeneration(message=mock_message)], llm_output={"token_usage": {}})
    
    with patch.object(rag_summarizer.llm, "_agenerate", AsyncMock(return_value=mock_result)):
        result = await rag_summarizer.summarize("Something", [])
        assert result["confidence_score"] < 0.70
        assert result["escalated_to_human"] is True
