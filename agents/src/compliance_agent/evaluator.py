from typing import Dict, Any, List
from common.llm import get_llm
from langchain_core.prompts import ChatPromptTemplate
import json
from compliance_agent.engine import deterministic_engine


class ComplianceAgent:
    """
    Hybrid compliance evaluator.

    - Deterministic engine is the source of truth for ComplianceReport
      (status, readiness_score, issues) based on Policy / Playbook.
    - LLM is used only for natural-language explanation / findings.
    """

    def __init__(self):
        self.llm = get_llm(temperature=0)

    async def evaluate(
        self,
        extracted_data: Dict[str, Any],
        regulations: List[Dict[str, Any]],
        playbook: Dict[str, Any] | None = None,
    ) -> Dict[str, Any]:
        """
        Executes compliance checks with deterministic engine, then augments with LLM explanation.

        :param extracted_data: Masked OCR / feature data from orchestrator.
        :param regulations: Retrieved regulation snippets (for explanation context).
        :param playbook: Optional procedural playbook / policy config.
        """

        # 1) Deterministic evaluation (source of truth)
        # For now, we branch explicitly on known service types.
        # In the future, this should be selected by caller based on flow.
        deterministic_report: Dict[str, Any]
        if playbook and playbook.get("service_type") == "TRADE_LICENSE_RENEWAL":
            deterministic_report = deterministic_engine.evaluate_trade_license_renewal(
                extracted_data, playbook
            )
        else:
            # Fallback: minimal deterministic output when no engine rule is defined
            deterministic_report = {
                "status": "UNCERTAIN",
                "readiness_score": 0,
                "issues": [
                    {
                        "code": "ENGINE_MISSING",
                        "message": "No deterministic rules configured for this service type.",
                        "severity": "INFO",
                        "remediation": "Route to human reviewer or configure engine rules.",
                    }
                ],
            }

        # 2) Optional LLM explanation (does not change status / readiness_score)
        reg_context = "\n".join(
            [f"Rule {r.get('id')}: {r.get('content')}" for r in regulations]
        )
        doc_text = extracted_data.get("masked_text", "")

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are a Compliance Officer for GovAssist Ethiopia. "
                    "Given the deterministic compliance result and the regulations, "
                    "produce a short JSON explanation with a 'findings' list "
                    "(each item: rule_id, result, reason). Do NOT change the status or readiness_score.",
                ),
                (
                    "human",
                    "Regulations:\n{regs}\n\n"
                    "DeterministicResult:\n{deterministic}\n\n"
                    "Extracted Document Text:\n{text}",
                ),
            ]
        )

        findings: List[Dict[str, Any]] = []
        try:
            chain = prompt | self.llm
            response = await chain.ainvoke(
                {
                    "regs": reg_context,
                    "deterministic": json.dumps(deterministic_report),
                    "text": doc_text,
                }
            )
            parsed = json.loads(response.content)
            findings = parsed.get("findings", [])
        except Exception:
            findings = [
                {
                    "rule_id": "system",
                    "result": "ERROR",
                    "reason": "Failed to generate LLM explanation.",
                }
            ]

        return {
            "status": deterministic_report["status"],
            "readiness_score": deterministic_report["readiness_score"],
            "issues": deterministic_report.get("issues", []),
            "findings": findings,
            "summary": f"Compliance evaluation completed with status: {deterministic_report['status']}",
        }


_compliance_agent: "ComplianceAgent | None" = None


def get_compliance_agent() -> ComplianceAgent:
    global _compliance_agent
    if _compliance_agent is None:
        _compliance_agent = ComplianceAgent()
    return _compliance_agent
