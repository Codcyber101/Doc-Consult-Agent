from typing import Dict, Any, List
from agents.src.common.llm import get_llm
from langchain_core.prompts import ChatPromptTemplate
import json

class ComplianceAgent:
    """
    Evaluates extracted document data against retrieved regulations.
    Determines PASS/FAIL/MANUAL_REVIEW status.
    """
    
    def __init__(self):
        self.llm = get_llm(temperature=0)

    async def evaluate(self, extracted_data: Dict[str, Any], regulations: List[Dict[str, Any]]) -> Dict[str, Any]:
        """ Executes compliance checks based on extracted data and regulations."""
        
        # Prepare Context
        reg_context = "\n".join([f"Rule {r['id']}: {r['content']}" for r in regulations])
        doc_text = extracted_data.get("masked_text", "")
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a Compliance Officer for GovAssist Ethiopia. "
                       "Evaluate the extracted document text against the provided regulations. "
                       "Return a JSON object with: 'status' (PASS, FAIL, or MANUAL_REVIEW), "
                       "'findings' (list of objects with rule_id, result, reason)."),
            ("human", "Regulations:\n{regs}\n\nExtracted Document Text:\n{text}")
        ])
        
        chain = prompt | self.llm
        response = await chain.ainvoke({"regs": reg_context, "text": doc_text})
        
        try:
            # Attempt to parse JSON from LLM response
            # Note: In production, use structured output or a parser
            result = json.loads(response.content)
            status = result.get("status", "MANUAL_REVIEW")
            findings = result.get("findings", [])
        except Exception:
            status = "MANUAL_REVIEW"
            findings = [{"rule_id": "system", "result": "ERROR", "reason": "Failed to parse compliance response."}]

        return {
            "status": status,
            "findings": findings,
            "summary": f"Compliance evaluation completed with status: {status}"
        }

compliance_agent = ComplianceAgent()
