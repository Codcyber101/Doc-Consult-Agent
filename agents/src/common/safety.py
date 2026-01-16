import re

class SafetyAgent:
    def __init__(self):
        # Basic patterns for common PII
        self.patterns = {
            "TIN": r"\b\d{10}\b",
            "PHONE": r"\b(?:\+251|0)9\d{8}\b",
            "EMAIL": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
            "PASSPORT": r"\b[A-Z]\d{7}\b",
        }
        
    def mask(self, text: str) -> str:
        """Masks PII in the given text."""
        masked_text = text
        for pii_type, pattern in self.patterns.items():
            masked_text = re.sub(pattern, f"<{pii_type}_REDACTED>", masked_text)
        return masked_text

    def audit_log(self, original_text: str, masked_text: str):
        """Logs the masking event for auditing."""
        # Simple file-based audit log for this implementation
        with open("pii_audit.log", "a") as f:
            f.write(f"Masked: {masked_text}\n")
        print(f"PII masking audited and logged.")

if __name__ == "__main__":
    agent = SafetyAgent()
    sample = "User with TIN 1234567890 and phone 0911223344 asked about trade license."
    print(f"Original: {sample}")
    print(f"Masked: {agent.mask(sample)}")
