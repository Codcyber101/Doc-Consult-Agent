from typing import List, Dict
from src.common.safety import SafetyAgent
from src.common.citation import CitationAuditor

class RAGSummarizer:
    def __init__(self, safety_agent: SafetyAgent, citation_auditor: CitationAuditor):
        self.safety_agent = safety_agent
        self.citation_auditor = citation_auditor

    def summarize(self, query: str, snippets: List[Dict]) -> Dict:
        """Generates a summarized response with citations and self-correction."""
        # 1. Mask PII in query
        masked_query = self.safety_agent.mask(query)
        
        # 2. Mocking LLM summarization
        summary_text = f"Based on retrieved regulations, regarding '{masked_query}': "
        summary_text += " ".join([s["content"][:50] + "..." for s in snippets])
        
        # 3. Validate citations (Self-Correction Loop)
        citations = self.citation_auditor.validate(summary_text, snippets)
        
        # Self-correction: If a claim isn't verified, we flag it or re-generate
        verified_citations = [c for c in citations if c["is_verified"]]
        if len(verified_citations) < len(citations):
            # In production, we'd trigger a re-generation here
            summary_text += " [Note: Some claims could not be fully verified against sources.]"
        
        # 4. Compute confidence score (Mock)
        confidence_score = 0.85 if len(verified_citations) > 0 else 0.4
        
        return {
            "summary": summary_text,
            "citations": verified_citations,
            "confidence_score": confidence_score,
            "escalated_to_human": confidence_score < 0.70
        }
