from typing import Dict, Any

class PortalStatusTracker:
    """
    Polls government portals for application status updates 
    and normalizes them for GAE internal use.
    """
    
    STATUS_MAPPING = {
        "RECEIVED": "SUBMITTED",
        "UNDER_REVIEW": "PROCESSING",
        "APPROVED": "COMPLETED",
        "REJECTED": "FAILED",
        "NEED_INFO": "PENDING_USER_ACTION"
    }

    async def get_normalized_status(self, tracking_id: str) -> Dict[str, Any]:
        """
        Fetches status from MESOB and returns a GAE-normalized status.
        """
        # Mock external status check
        external_status = "UNDER_REVIEW" # In real life, fetch via API
        
        internal_status = self.STATUS_MAPPING.get(external_status, "UNKNOWN")
        
        return {
            "tracking_id": tracking_id,
            "external_status": external_status,
            "internal_status": internal_status,
            "updated_at": "2026-01-12T15:30:00Z"
        }

status_tracker = PortalStatusTracker()
