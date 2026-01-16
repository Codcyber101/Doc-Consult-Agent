import pytest
from src.common.safety import SafetyAgent
from src.common.citation import CitationAuditor

def test_safety_agent_masking():
    agent = SafetyAgent()
    text = "My TIN is 1234567890 and phone is 0911223344"
    masked = agent.mask(text)
    assert "1234567890" not in masked
    assert "0911223344" not in masked
    assert "<TIN_REDACTED>" in masked
    assert "<PHONE_REDACTED>" in masked

def test_citation_auditor_basic():
    auditor = CitationAuditor()
    summary = "The trade license fee is 500 ETB."
    snippets = [{"id": "uuid-1", "document_id": "PROC-123", "content": "Fee is 500 ETB."}]
    citations = auditor.validate(summary, snippets)
    assert len(citations) == 1
    assert citations[0]["is_verified"] is True
    assert citations[0]["snippet_id"] == "uuid-1"

def test_verify_claim():
    auditor = CitationAuditor()
    assert auditor.verify_claim("Fee is 500", "The license fee is 500 ETB") is True
    assert auditor.verify_claim("Fee is 1000", "The license fee is 500 ETB") is False
