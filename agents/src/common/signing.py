import hashlib
import hmac
import json
import secrets
from typing import Any, Dict
from common.config import settings
from common.secrets import secrets as secret_manager


class Signer:
    """
    Wrapper for signing artifacts.
    In production, this would interface with a hardware security module (HSM)
    or a cloud KMS (Key Management Service).
    """

    def __init__(self, key_id: str = settings.SIGNING_KEY_ID):
        self.key_id = key_id
        # Use SecretManager to resolve the signing secret.
        # It handles ${VAULT_KEY_SIGNING} placeholders or direct env vars.
        secret = secret_manager.get_secret("SIGNING_SECRET")

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
