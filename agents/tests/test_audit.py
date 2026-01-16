import pytest
import os
from src.common.safety import SafetyAgent
from src.regulation_expert.summarization import RAGSummarizer
from src.common.citation import CitationAuditor

def test_safety_audit_logging():
    agent = SafetyAgent()
    if os.path.exists("pii_audit.log"):
        os.remove("pii_audit.log")
        
    agent.audit_log("Secret TIN 123", "Secret TIN <REDACTED>")
    assert os.path.exists("pii_audit.log")
    with open("pii_audit.log", "r") as f:
        content = f.read()
        assert "<REDACTED>" in content

def test_escalation_logic():
    # This logic is tested in test_rag.py, but we can add more specific cases
    safety = SafetyAgent()
    auditor = CitationAuditor()
    summarizer = RAGSummarizer(safety, auditor)
    
    # Low confidence scenario
    result = summarizer.summarize("Question", [])
    assert result["escalated_to_human"] is True
