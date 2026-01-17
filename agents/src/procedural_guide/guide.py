from typing import Dict, Any, List, Optional
import yaml
import os

class ProceduralGuideAgent:
    """
    Guides the user through step-by-step government processes based on 
    Procedural Playbooks from the Policy Registry.
    """

    def __init__(self, registry_path: str = "policy-registry"):
        self.registry_path = registry_path

    def get_playbook(self, jurisdiction: str, process_id: str) -> Optional[Dict[str, Any]]:
        """Loads a playbook from the registry."""
        file_path = os.path.join(self.registry_path, jurisdiction, f"{process_id}.yaml")
        if not os.path.exists(file_path):
            return None
        
        try:
            with open(file_path, "r") as f:
                return yaml.safe_load(f)
        except Exception as e:
            print(f"[PROCEDURAL GUIDE] Error loading playbook: {e}")
            return None

    def get_next_step(self, playbook: Dict[str, Any], completed_steps: List[str]) -> Dict[str, Any]:
        """
        Calculates the next required step based on the playbook and user progress.
        """
        steps = playbook.get("steps", [])
        for step in steps:
            if step["id"] not in completed_steps:
                return {
                    "step": step,
                    "is_complete": False,
                    "total_steps": len(steps),
                    "completed_count": len(completed_steps)
                }
        
        return {
            "is_complete": True,
            "message": "All steps in this playbook have been completed."
        }

    def evaluate_readiness(self, playbook: Dict[str, Any], extracted_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculates a readiness score based on required documents and fields.
        """
        required_docs = playbook.get("required_documents", [])
        # This would check the list of uploaded/extracted docs
        # Mock logic
        found_docs = extracted_data.get("documents", [])
        missing = [d for d in required_docs if d not in found_docs]
        
        score = (len(required_docs) - len(missing)) / len(required_docs) if required_docs else 1.0
        
        return {
            "readiness_score": score,
            "missing_documents": missing,
            "can_submit": score >= 0.9
        }

procedural_guide = ProceduralGuideAgent()
