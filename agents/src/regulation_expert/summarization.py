from typing import List, Dict
from agents.src.common.safety import SafetyAgent
from agents.src.common.citation import CitationAuditor
from agents.src.common.llm import get_llm
from langchain_core.prompts import ChatPromptTemplate

class RAGSummarizer:
    def __init__(self, safety_agent: SafetyAgent, citation_auditor: CitationAuditor):
        self.safety_agent = safety_agent
        self.citation_auditor = citation_auditor
        self.llm = get_llm(temperature=0.1)

    async def summarize(self, query: str, snippets: List[Dict]) -> Dict:
        """Generates a summarized response with citations and self-correction."""
        # 1. Mask PII in query
        masked_query = self.safety_agent.mask(query)
        
        # 2. Prepare Context from Snippets
        context_text = "\n\n".join([f"Source [{i}]: {s['content']}" for i, s in enumerate(snippets)])
        
        # 3. LLM Summarization with Groq
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an expert legal assistant for GovAssist Ethiopia. "
                       "Summarize the provided regulation snippets to answer the user's query. "
                       "Be precise and cite your sources using [Source X]. "
                       "If the information is not present, state that clearly."),
            ("human", "Context:\n{context}\n\nQuery: {query}")
        ])
        
        chain = prompt | self.llm
        response = await chain.ainvoke({"context": context_text, "query": masked_query})
        summary_text = response.content
        
        # 4. Validate citations (Self-Correction Loop)
        citations = self.citation_auditor.validate(summary_text, snippets)
        
        # Self-correction: If a claim isn't verified, we flag it or re-generate
        verified_citations = [c for c in citations if c["is_verified"]]
        if len(verified_citations) < len(citations):
            summary_text += "\n\n[Note: Some claims in this summary could not be fully verified against the provided source snippets.]"
        
        # 5. Compute confidence score
        confidence_score = 0.9 if len(verified_citations) == len(citations) and len(citations) > 0 else 0.5
        
        return {
            "summary": summary_text,
            "citations": verified_citations,
            "confidence_score": confidence_score,
            "escalated_to_human": confidence_score < 0.70
        }
