from typing import Dict, Any, List
from agents.src.common.state import AgentState

class ComplianceAgent:
    """
    Evaluates extracted document data against retrieved regulations.
    Determines PASS/FAIL/MANUAL_REVIEW status.
    """
    
    def evaluate(self, extracted_data: Dict[str, Any], regulations: List[Dict[str, Any]]) -> Dict[str, Any]:
        """ Executes compliance checks based on extracted data and regulations."""
        findings = []
        status = "PASS"
        
        # Simple Example Check: Passport Validity
        # In a real scenario, this would use an LLM or a rule engine
        text = extracted_data.get("masked_text", "").lower()
        
        for reg in regulations:
            if "validity" in reg["content"].lower():
                # Perform check logic
                if "valid" not in text:
                    findings.append({
                        "rule_id": reg["id"],
                        "result": "FAIL",
                        "reason": "Could not confirm document validity from extraction."
                    })
                    status = "MANUAL_REVIEW"

        return {
            "status": status,
            "findings": findings,
            "summary": f"Compliance evaluation completed with status: {status}"
        }

compliance_agent = ComplianceAgent()
