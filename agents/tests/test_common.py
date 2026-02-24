from common.safety import SafetyAgent


def test_safety_agent_masking():
    agent = SafetyAgent()
    # Updated test string to match refined pattern order
    text = "My TIN is 1234567890 and phone is 0911223344"
    masked = agent.mask(text)
    assert "1234567890" not in masked
    assert "0911223344" not in masked
    assert "<TIN_REDACTED>" in masked
    assert "<PHONE_REDACTED>" in masked


def test_safety_agent_email_masking():
    agent = SafetyAgent()
    text = "Contact me at test@example.com"
    masked = agent.mask(text)
    assert "test@example.com" not in masked
    assert "<EMAIL_REDACTED>" in masked


def test_safety_agent_passport_masking():
    agent = SafetyAgent()
    text = "Passport: A1234567"
    masked = agent.mask(text)
    assert "A1234567" not in masked
    assert "<PASSPORT_REDACTED>" in masked
