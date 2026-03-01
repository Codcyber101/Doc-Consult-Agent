import os
import re
from typing import Optional

try:
    import hvac
except ImportError:
    hvac = None


class SecretManager:
    """
    Centralized secret management for GAE Agents.
    Supports HashiCorp Vault and environment variable fallback.
    Resolves placeholders like ${VAULT_KEY_SIGNING}.
    """

    def __init__(self):
        self.vault_addr = os.getenv("VAULT_ADDR")
        self.vault_token = os.getenv("VAULT_TOKEN")
        self._client = None

        if self.vault_addr and self.vault_token and hvac:
            try:
                self._client = hvac.Client(url=self.vault_addr, token=self.vault_token)
                if not self._client.is_authenticated():
                    self._client = None
            except Exception:
                self._client = None

    def get_secret(self, key: str, default: Optional[str] = None) -> Optional[str]:
        """
        Resolves a secret key. If the key is a placeholder like ${NAME},
        it attempts to resolve 'NAME' from Vault or Env.
        """
        original_key = key
        # Extract name from ${NAME} if present
        match = re.match(r"^\$\{(.*)\}$", key)
        if match:
            key = match.group(1)

        # 1. Try Vault
        if self._client:
            try:
                # Assuming KV engine at 'secret/' and data at 'gae'
                response = self._client.secrets.kv.v2.read_secret_version(
                    path="gae", mount_point="secret"
                )
                val = response["data"]["data"].get(key)
                if val:
                    return val
            except Exception:
                pass

        # 2. Try Env
        val = os.getenv(key)
        if val:
            return val

        # 3. Fallback to original key if it wasn't a placeholder
        if not original_key.startswith("${"):
            return original_key

        return default


secrets = SecretManager()
