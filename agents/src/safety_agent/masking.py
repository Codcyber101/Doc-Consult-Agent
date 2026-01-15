import re
from typing import Dict, Any, List
from agents.src.common.state import AgentState

class SafetyAgent:
    """
    Identifies and masks PII (Personally Identifiable Information) 
    to ensure cloud-compliance and privacy.
    """
    
    # Simple regex patterns for PII
    PATTERNS = {
        "email": r'[\w\.-]+@[\w\.-]+\.\w+',
        "phone_et": r'(\+251|0)9\d{8}',
        "passport": r'[A-Z]\d{7}[A-Z]',
        # Mock Amharic name detection (very simplified)
        "amharic_name_indicator": r'(አቶ|ወ/ሮ|ወ/ሪት)\s+[\u1200-\u137F]+'
    }

    def mask_pii(self, text: str) -> str:
        """Replaces detected PII with [MASKED]."""
        masked_text = text
        for label, pattern in self.PATTERNS.items():
            masked_text = re.sub(pattern, f"[MASKED_{label.upper()}]", masked_text)
        return masked_text

    def extract_and_mask(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """Processes raw extraction data for safety."""
        raw_text = raw_data.get("raw_text", "")
        masked_text = self.mask_pii(raw_text)
        
        return {
            "masked_text": masked_text,
            "pii_detected": masked_text != raw_text,
            "safety_status": "CLEAN"
        }

safety_agent = SafetyAgent()
