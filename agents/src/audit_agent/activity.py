from datetime import datetime
from typing import Any, Dict
from agents.src.common.signing import signer

class AuditLogger:
    """
    Handles immutable logging of agent activities.
    Each entry is signed to ensure non-repudiation.
    """
    
    async def log_event(self, event_type: str, actor: str, details: Dict[str, Any]):
        """
        Logs an event with a cryptographic signature.
        In a full implementation, this would send data to the Audit database/Merkle tree.
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
        
        # TODO: Persist to Weaviate/Postgres via Backend API
        print(f"[AUDIT] {event_type} by {actor}: {signature[:15]}...")
        return log_entry

audit_logger = AuditLogger()
