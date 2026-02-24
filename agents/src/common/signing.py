import hashlib
import hmac
import json
import os
import secrets
from typing import Any, Dict
from common.config import settings


class Signer:
    """
    Wrapper for signing artifacts.
    In production, this would interface with a hardware security module (HSM)
    or a cloud KMS (Key Management Service).
    """

    def __init__(self, key_id: str = settings.SIGNING_KEY_ID):
        self.key_id = key_id
        # Production: secret material must come from Vault/HSM-provisioned env.
        # Development: fall back to ephemeral key material to avoid hardcoding secrets in repo.
        secret = os.getenv("SIGNING_SECRET")
        if not secret:
            if settings.ENVIRONMENT == "production":
                raise RuntimeError("SIGNING_SECRET must be set in production.")
            secret = secrets.token_hex(32)
        self._secret = secret.encode()

    def sign_payload(self, payload: Dict[str, Any]) -> str:
        """Generates a cryptographic signature for a dictionary payload."""
        dumped = json.dumps(payload, sort_keys=True)
        signature = hmac.new(self._secret, dumped.encode(), hashlib.sha256).hexdigest()
        return f"v1:{signature}"

    def verify_signature(self, payload: Dict[str, Any], signature: str) -> bool:
        """Verifies the signature of a payload."""
        expected = self.sign_payload(payload)
        return hmac.compare_digest(expected, signature)


signer = Signer()
