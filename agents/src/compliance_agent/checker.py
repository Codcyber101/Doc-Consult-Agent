class ComplianceAgent:
    def check_compliance(self, analysis_results, playbook_step):
        # Mock deterministic compliance check
        is_compliant = True
        issues = []
        
        if analysis_results['confidence'] < 0.7:
            is_compliant = False
            issues.append({"code": "LOW_CONFIDENCE", "message": "OCR confidence too low"})
            
        return {
            "status": "PASS" if is_compliant else "FAIL",
            "readiness_score": 90 if is_compliant else 40,
            "issues": issues
        }
