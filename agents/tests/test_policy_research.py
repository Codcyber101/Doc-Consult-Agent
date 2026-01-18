import pytest
import os
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

def test_crawl_tool_firecrawl():
    # Ensure api_key is present (assumes env var is set)
    if not os.getenv("FIRECRAWL_API_KEY"):
        pytest.skip("FIRECRAWL_API_KEY not set")

    tool = PolicyCrawlTool()
    # Use a real URL from the allowlist
    text = tool.crawl_text("https://ethiopian-law.com")
    
    assert isinstance(text, str)
    assert len(text) > 0

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