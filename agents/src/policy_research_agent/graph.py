from typing import TypedDict, List, Annotated
import operator
from langgraph.graph import StateGraph, END

from .tools import is_domain_allowed

class AgentState(TypedDict):
    query: str
    urls: List[str]
    documents: List[str]
    draft_policy: str
    sources: List[dict]
    confidence_score: float
    allowlist: List[str]

def research_node(state: AgentState):
    # Mocking search results for now
    search_results = [
        {"url": "https://trade.gov.et/laws", "snippet": "Legal text about trade..."},
        {"url": "https://malicious-blog.com/fake-laws", "snippet": "Fake info..."}
    ]
    
    allowlist = state.get("allowlist", [])
    filtered_sources = []
    for source in search_results:
        if is_domain_allowed(source["url"], allowlist):
            filtered_sources.append(source)
    
    if not filtered_sources and search_results:
        # All found sources were blocked by allowlist
        raise ValueError(f"Security Error: All search results were blocked by the domain allowlist. Query: {state['query']}")
            
    return {"sources": filtered_sources, "urls": [s["url"] for s in filtered_sources]}

def draft_node(state: AgentState):
    sources = state.get("sources", [])
    
    # Simulate LLM extracting rules and assigning confidence
    draft_content = {
        "title": f"Policy Draft for {state['query']}",
        "rules": [
            {
                "id": "R001",
                "text": "Requirement extracted from search results.",
                "confidence": 0.92,
                "citation": sources[0]["url"] if sources else "N/A"
            }
        ]
    }
    
    # Prepare source bundle for US2
    source_bundle = []
    for s in sources:
        source_bundle.append({
            "url": s["url"],
            "snippet": s["snippet"],
            "confidence": 0.95 # Simulated source reliability
        })

    return {
        "draft_policy": str(draft_content), 
        "sources": source_bundle,
        "confidence_score": 0.92
    }

def create_graph():
    workflow = StateGraph(AgentState)
    
    workflow.add_node("research", research_node)
    workflow.add_node("draft", draft_node)
    
    workflow.set_entry_point("research")
    workflow.add_edge("research", "draft")
    workflow.add_edge("draft", END)
    
    return workflow.compile()

