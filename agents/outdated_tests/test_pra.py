from src.policy_research_agent.workflows import PolicyDraftGenerator
from src.policy_research_agent.tools import PolicyCrawlTool


def test_hierarchy_prioritization():
    gen = PolicyDraftGenerator()
    rules = [
        {"id": "R1", "type": "Directive", "text": "Lower"},
        {"id": "R2", "type": "Proclamation", "text": "Higher"},
    ]
    sorted_rules = gen.prioritize_rules(rules)
    assert sorted_rules[0]["type"] == "Proclamation"


def test_yaml_generation_and_validation():
    gen = PolicyDraftGenerator()
    rules = [{"id": "R1", "type": "Proclamation", "text": "Test"}]
    yml = gen.generate_yaml("Test Policy", "Federal", rules)
    assert "Test Policy" in yml
    assert gen.validate_schema(yml) is True


def test_crawl_allowlist():
    tool = PolicyCrawlTool(allowlist=["example.com"])
    assert tool.is_allowed("https://example.com/page") is True
    assert tool.is_allowed("https://malicious.com/page") is False
