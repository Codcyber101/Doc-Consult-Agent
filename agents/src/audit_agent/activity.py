from datetime import datetime
from typing import Any, Dict
import json
import os
import httpx
from common.signing import signer


class AuditLogger:
    """
    Handles immutable logging of agent activities.
    Each entry is signed to ensure non-repudiation.
    """

    def __init__(self, log_file: str = "/tmp/gae_audit.jsonl"):
        self.log_file = log_file

    async def log_event(self, event_type: str, actor: str, details: Dict[str, Any]):
        """
        Logs an event with a cryptographic signature and persists it.
        """
        timestamp = datetime.utcnow().isoformat()

        payload = {
            "timestamp": timestamp,
            "event_type": event_type,
            "actor": actor,
            "details": details,
        }

        signature = signer.sign_payload(payload)

        log_entry = {**payload, "signature": signature, "key_id": signer.key_id}

        # 1. Persist to local log file (Audit Trail)
        try:
            with open(self.log_file, "a") as f:
                f.write(json.dumps(log_entry) + "\n")
        except Exception as e:
            print(f"[AUDIT ERROR] Failed to write to log file: {e}")

        # 2. In production, this would also emit to Kafka or call Backend API
        await self._emit_to_backend(log_entry)

        print(f"[AUDIT] {event_type} by {actor} [SIGNED]")
        return log_entry

    async def _emit_to_backend(self, log_entry: Dict[str, Any]):
        """Placeholder for Backend API integration."""
        backend_url = os.getenv("BACKEND_API_URL")
        internal_token = os.getenv("INTERNAL_API_TOKEN")
        if not backend_url or not internal_token:
            return

        try:
            async with httpx.AsyncClient(timeout=10) as client:
                await client.post(
                    f"{backend_url}/internal/audit/events",
                    headers={"x-internal-token": internal_token},
                    json=log_entry,
                )
        except Exception:
            # best-effort only; local JSONL remains authoritative fallback
            return


audit_logger = AuditLogger()
