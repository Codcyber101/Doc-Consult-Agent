import pytest
from agents.src.safety_agent.masking import safety_agent
from agents.src.compliance_agent.evaluator import compliance_agent

def test_safety_agent_masking():
    test_text = "Contact me at test@example.com or call 0911223344. Passport: A1234567B"
    masked = safety_agent.mask_pii(test_text)
    
    assert "[MASKED_EMAIL]" in masked
    assert "[MASKED_PHONE_ET]" in masked
    assert "[MASKED_PASSPORT]" in masked
    assert "test@example.com" not in masked

def test_compliance_evaluation_pass():
    extracted_data = {"masked_text": "This document is valid until 2026."}
    regulations = [{"id": "R1", "content": "Document must be valid."}]
    
    result = compliance_agent.evaluate(extracted_data, regulations)
    assert result["status"] == "PASS"

def test_compliance_evaluation_manual_review():
    extracted_data = {"masked_text": "Expiry date unreadable."}
    regulations = [{"id": "R1", "content": "Document must be valid."}]
    
    result = compliance_agent.evaluate(extracted_data, regulations)
    assert result["status"] == "MANUAL_REVIEW"
    assert len(result["findings"]) > 0
