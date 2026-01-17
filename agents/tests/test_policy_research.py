import pytest
from unittest.mock import MagicMock, patch, AsyncMock
from src.policy_research_agent.tools import PolicyCrawlTool
from src.policy_research_agent.workflows import PolicyDraftGenerator
from langchain_core.outputs import ChatResult, ChatGeneration
from langchain_core.messages import AIMessage

def test_crawl_tool_allowlist():
    tool = PolicyCrawlTool()
    assert tool.is_allowed("https://chilot.me/law") is True
    assert tool.is_allowed("https://evil-site.com") is False
    
    with pytest.raises(ValueError):
        tool.crawl_text("https://evil-site.com")

def test_crawl_tool_pdf_extraction():
    tool = PolicyCrawlTool()
    
    with patch("requests.get") as mock_get, \
         patch("src.policy_research_agent.tools.PdfReader") as mock_pdf_reader:
        
        # Mock Response
        mock_response = MagicMock()
        mock_response.headers = {"Content-Type": "application/pdf"}
        mock_response.content = b"%PDF-1.4..."
        mock_get.return_value = mock_response
        
        # Mock PDF Reader
        mock_page = MagicMock()
        mock_page.extract_text.return_value = "Page Content"
        mock_reader_instance = MagicMock()
        mock_reader_instance.pages = [mock_page]
        mock_pdf_reader.return_value = mock_reader_instance
        
        text = tool.crawl_text("https://chilot.me/law.pdf")
        assert "Page Content" in text

@pytest.mark.asyncio
async def test_policy_draft_generator():
    generator = PolicyDraftGenerator()
    
    # Create proper AIMessage for response
    content = "title: Test Policy\njurisdiction: Federal\nrules: []"
    mock_message = AIMessage(content=content)
    mock_result = ChatResult(generations=[ChatGeneration(message=mock_message)], llm_output={"token_usage": {}})
    
    # Patch _agenerate
    with patch.object(generator.llm, "_agenerate", AsyncMock(return_value=mock_result)):
        yaml_text = await generator.draft_policy_from_research("Topic", "Research Data")
        assert "title: Test Policy" in yaml_text
    
    # Test Prioritization
    rules = [{"type": "Guideline"}, {"type": "Proclamation"}]
    sorted_rules = generator.prioritize_rules(rules)
    assert sorted_rules[0]["type"] == "Proclamation"