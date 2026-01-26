from datetime import datetime
from typing import Any, Dict
import json
from agents.src.common.signing import signer

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
            "details": details
        }
        
        signature = signer.sign_payload(payload)
        
        log_entry = {
            **payload,
            "signature": signature,
            "key_id": signer.key_id
        }
        
        # 1. Persist to local log file (Audit Trail)
        try:
            with open(self.log_file, "a") as f:
                f.write(json.dumps(log_entry) + "\n")
        except Exception as e:
            print(f"[AUDIT ERROR] Failed to write to log file: {e}")
        
        # 2. In production, this would also emit to Kafka or call Backend API
        # await self._emit_to_backend(log_entry)
        
        print(f"[AUDIT] {event_type} by {actor} [SIGNED]")
        return log_entry

    async def _emit_to_backend(self, log_entry: Dict[str, Any]):
        """Placeholder for Backend API integration."""
        # async with httpx.AsyncClient() as client:
        #     await client.post(f"{settings.BACKEND_URL}/v1/audit/events", json=log_entry)
        pass

audit_logger = AuditLogger()
