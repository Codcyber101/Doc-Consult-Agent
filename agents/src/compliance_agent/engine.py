from typing import Dict, Any, List, Literal
import math

ComplianceStatus = Literal["PASS", "FAIL", "CONDITIONAL", "UNCERTAIN"]


class DeterministicComplianceEngine:
    """
    Deterministic, spec-aligned compliance engine.

    - Input: extracted_data from orchestrator (documents, features, etc.)
    - Policies: simple rule set derived from playbook/policy registry.
    - Output: ComplianceReport-compatible dict (status, readiness_score, issues).
    """

    def evaluate_trade_license_renewal(
        self, extracted_data: Dict[str, Any], playbook: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Evaluates readiness for Trade License Renewal based on the Addis Ababa - Bole playbook.
        This is intentionally deterministic and does not call any LLMs.
        """
        required_docs: List[str] = []
        for step in playbook.get("steps", []):
            # Flatten all requirements into a single required document list
            reqs = step.get("requirements") or []
            for r in reqs:
                if isinstance(r, str) and r not in required_docs:
                    required_docs.append(r)

        # Extract uploaded / detected documents from extracted_data
        available_docs: List[str] = extracted_data.get("documents", [])

        missing_docs: List[str] = [r for r in required_docs if r not in available_docs]

        # Basic readiness score: percentage of required documents present
        total = len(required_docs)
        if total == 0:
            readiness_score = 100
        else:
            readiness_score = math.floor(((total - len(missing_docs)) / total) * 100)

        issues: List[Dict[str, Any]] = []

        for missing in missing_docs:
            issues.append(
                {
                    "code": "MISSING_DOCUMENT",
                    "message": f"Required document missing: {missing}",
                    "severity": "ERROR",
                    "remediation": f"Upload a clear scan or photo of: {missing}",
                }
            )

        # Simple quality checks from extracted_data.features
        features = extracted_data.get("features") or {}
        if features.get("has_stamp") is False:
            issues.append(
                {
                    "code": "STAMP_MISSING",
                    "message": "Official stamp not detected on the uploaded document.",
                    "severity": "WARNING",
                    "remediation": "Retake the photo ensuring the stamp is fully visible and in focus.",
                }
            )
        if features.get("has_signature") is False:
            issues.append(
                {
                    "code": "SIGNATURE_MISSING",
                    "message": "Required signature not detected on the uploaded document.",
                    "severity": "WARNING",
                    "remediation": "Retake or re-upload the document with a visible signature.",
                }
            )

        # Derive status from issues and readiness
        if any(i["severity"] == "ERROR" for i in issues):
            status: ComplianceStatus = "FAIL"
        elif any(i["severity"] == "WARNING" for i in issues):
            status = "CONDITIONAL"
        else:
            status = "PASS"

        # If extracted_data is clearly incomplete, mark as UNCERTAIN
        if not extracted_data.get("documents"):
            status = "UNCERTAIN"

        return {
            "status": status,
            "readiness_score": max(0, min(100, readiness_score)),
            "issues": issues,
        }


deterministic_engine = DeterministicComplianceEngine()

