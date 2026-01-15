from typing import Dict, Any

class MesobTemplate:
    """
    Handles data mapping for the MESOB (Ethiopian Government Portal) API.
    Transforms internal AgentState data into portal-specific schemas.
    """
    
    @staticmethod
    def map_passport_renewal(data: Dict[str, Any]) -> Dict[str, Any]:
        """Maps internal extraction data to MESOB Passport Renewal schema."""
        # This mapping would be refined based on actual MESOB API specs
        return {
            "applicationType": "PASSPORT_RENEWAL",
            "applicant": {
                "fullName": data.get("full_name", "Unknown"),
                "existingPassportNumber": data.get("passport_number"),
            },
            "attachments": [
                {
                    "type": "PASSPORT_SCAN",
                    "hash": data.get("file_hash"),
                    "uri": data.get("file_path")
                }
            ],
            "metadata": {
                "source": "GAE_AGENT_ENSEMBLE",
                "compliance_status": data.get("status")
            }
        }

mesob_template = MesobTemplate()
