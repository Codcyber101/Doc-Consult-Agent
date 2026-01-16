from typing import TypedDict, List
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    query: str
    urls: List[str]
    raw_text: str
    draft_yaml: str
    is_valid: bool
    iterations: int

def search_node(state: AgentState):
    """Searches for relevant URLs."""
    # Mocking search results
    query = state["query"]
    return {"urls": [f"https://ethiopian-law.com/{query.replace(' ', '-')}"], "iterations": state.get("iterations", 0) + 1}

def extract_node(state: AgentState):
    """Extracts text from URLs."""
    # Mocking extraction
    return {"raw_text": f"Raw content about {state['query']} extracted from {state['urls']}"}

def validate_node(state: AgentState):
    """Validates the extracted content."""
    # Simple validation heuristic
    is_valid = len(state["raw_text"]) > 10
    return {"is_valid": is_valid}

def build_research_graph():
    workflow = StateGraph(AgentState)

    workflow.add_node("search", search_node)
    workflow.add_node("extract", extract_node)
    workflow.add_node("validate", validate_node)

    workflow.set_entry_point("search")
    workflow.add_edge("search", "extract")
    workflow.add_edge("extract", "validate")

    workflow.add_conditional_edges(
        "validate",
        lambda x: "generate" if x["is_valid"] else "search",
        {
            "generate": END, # We'll handle generation in workflows.py or a next node
            "search": "search"
        }
    )

    return workflow.compile()