import hashlib
import hmac
import json
from typing import Any, Dict
from agents.src.common.config import settings

class Signer:
    """
    Wrapper for signing artifacts. 
    In production, this would interface with a hardware security module (HSM) 
    or a cloud KMS (Key Management Service).
    """
    
    def __init__(self, key_id: str = settings.SIGNING_KEY_ID):
        self.key_id = key_id
        # In a real scenario, the secret would be handled by the HSM/KMS
        self._secret = "sovereign-ethiopia-internal-secret".encode()

    def sign_payload(self, payload: Dict[str, Any]) -> str:
        """Generates a cryptographic signature for a dictionary payload."""
        dumped = json.dumps(payload, sort_keys=True)
        signature = hmac.new(
            self._secret, 
            dumped.encode(), 
            hashlib.sha256
        ).hexdigest()
        return f"v1:{signature}"

    def verify_signature(self, payload: Dict[str, Any], signature: str) -> bool:
        """Verifies the signature of a payload."""
        expected = self.sign_payload(payload)
        return hmac.compare_digest(expected, signature)

signer = Signer()
