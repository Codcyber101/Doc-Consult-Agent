from typing import Dict, Any
import httpx
import os
from agents.src.common.state import AgentState
from agents.src.audit_agent.activity import audit_logger

class HumanReviewAgent:
    """
    Handles escalation to human officers when automated confidence is low
    or compliance rules flag a requirement for manual verification.
    """
    
    async def submit_to_queue(self, state: AgentState, reason: str) -> Dict[str, Any]:
        """
        Submits a document processing state to the human review queue via Backend API.
        """
        queue_item = {
            "document_id": state.get("document_id"),
            "file_path": state.get("file_path"),
            "reason": reason,
            "extracted_data": state.get("extracted_data"),
            "status": "PENDING_REVIEW"
        }
        
        # 1. Audit the escalation
        await audit_logger.log_event(
            "escalation_to_human", 
            "human_review_agent", 
            {"reason": reason, "doc_id": state.get("document_id")}
        )
        
        # 2. Call Backend API to persist
        try:
            # Note: BACKEND_URL needs to be in settings. Using a placeholder for now.
            backend_url = os.getenv("BACKEND_API_URL", "http://localhost:3000/v1")
            async with httpx.AsyncClient() as client:
                response = await client.post(f"{backend_url}/review/submit", json=queue_item)
                response.raise_for_status()
                print(f"[HUMAN REVIEW] Submitted to backend: {response.status_code}")
        except Exception as e:
            print(f"[HUMAN REVIEW ERROR] Failed to submit to backend: {e}")
            # Fallback: In a real system, we might use a local queue/retry mechanism
        
        print(f"[HUMAN REVIEW] Document {state.get('document_id')} escalated: {reason}")
        return queue_item

human_review_agent = HumanReviewAgent()
