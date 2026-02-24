import pytest
from policy_research_agent.graph import research_node, draft_node, is_domain_allowed


def test_is_domain_allowed():
    allowlist = ["*.gov.et", "example.com"]
    assert is_domain_allowed("https://trade.gov.et/laws", allowlist) is True
    assert is_domain_allowed("https://sub.trade.gov.et/laws", allowlist) is True
    assert is_domain_allowed("https://example.com/page", allowlist) is True
    assert is_domain_allowed("https://malicious.com", allowlist) is False


def test_research_node_filtering():
    state = {"query": "test", "allowlist": ["trade.gov.et"]}
    result = research_node(state)
    assert len(result["urls"]) == 1
    assert result["urls"][0] == "https://trade.gov.et/laws"


def test_research_node_blocked_all():
    state = {"query": "test", "allowlist": ["something-else.com"]}
    with pytest.raises(ValueError, match="Security Error"):
        research_node(state)


def test_draft_node_generates_content():
    state = {
        "query": "trade license",
        "sources": [{"url": "http://gov.et", "snippet": "info"}],
    }
    result = draft_node(state)
    assert "draft_policy" in result
    assert result["confidence_score"] > 0
    assert len(result["sources"]) == 1
