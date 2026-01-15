from typing import Dict, Any
from agents.src.common.state import AgentState
from agents.src.audit_agent.activity import audit_logger

class HumanReviewAgent:
    """
    Handles escalation to human officers when automated confidence is low
    or compliance rules flag a requirement for manual verification.
    """
    
    async def submit_to_queue(self, state: AgentState, reason: str) -> Dict[str, Any]:
        """
        Submits a document processing state to the human review queue.
        """
        queue_item = {
            "document_id": state.get("document_id"),
            "file_path": state.get("file_path"),
            "reason": reason,
            "extracted_data": state.get("extracted_data"),
            "status": "PENDING_REVIEW"
        }
        
        # In a real implementation, this would call a Backend API to persist the queue item
        await audit_logger.log_event(
            "escalation_to_human", 
            "human_review_agent", 
            {"reason": reason, "doc_id": state.get("document_id")}
        )
        
        print(f"[HUMAN REVIEW] Document {state.get('document_id')} escalated: {reason}")
        return queue_item

human_review_agent = HumanReviewAgent()
