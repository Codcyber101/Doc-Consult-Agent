import pytest
from src.regulation_expert.summarization import RAGSummarizer
from src.common.safety import SafetyAgent
from src.common.citation import CitationAuditor

def test_rag_summarization_flow():
    safety = SafetyAgent()
    auditor = CitationAuditor()
    summarizer = RAGSummarizer(safety, auditor)
    
    query = "User TIN 1234567890 wants to know about VAT"
    snippets = [{"id": "s1", "content": "VAT is 15%", "document_id": "PROC-1"}]
    
    result = summarizer.summarize(query, snippets)
    
    assert "1234567890" not in result["summary"]
    assert "<TIN_REDACTED>" in result["summary"]
    assert len(result["citations"]) == 1
    assert result["confidence_score"] == 0.85
    assert result["escalated_to_human"] is False

def test_rag_low_confidence_escalation():
    safety = SafetyAgent()
    auditor = CitationAuditor()
    summarizer = RAGSummarizer(safety, auditor)
    
    result = summarizer.summarize("Something obscure", [])
    assert result["confidence_score"] < 0.70
    assert result["escalated_to_human"] is True
