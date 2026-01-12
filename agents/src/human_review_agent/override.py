from typing import Dict, Any
from agents.src.common.signing import signer
from agents.src.audit_agent.activity import audit_logger

class ReviewOverride:
    """
    Handles the application of manual corrections from human officers.
    Ensures the final report is re-signed with the officer's context.
    """
    
    async def apply_override(self, document_id: string, officer_id: str, corrections: Dict[str, Any]) -> Dict[str, Any]:
        """
        Applies manual corrections and generates a new signed report.
        """
        new_report = {
            "document_id": document_id,
            "status": "PASS", # Officers usually override to PASS or FAIL
            "corrections": corrections,
            "reviewed_by": officer_id,
            "override_applied": True
        }
        
        signature = signer.sign_payload(new_report)
        final_artifact = {**new_report, "signature": signature}
        
        await audit_logger.log_event(
            "manual_override",
            f"officer:{officer_id}",
            {"doc_id": document_id, "signature": signature}
        )
        
        return final_artifact

review_override = ReviewOverride()
