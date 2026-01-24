from typing import Dict, Any, Literal
from langgraph.graph import StateGraph, END
from agents.src.common.state import AgentState
from agents.src.vision_router.router import vision_router
from agents.src.safety_agent.masking import safety_agent
from agents.src.regulation_expert.retrieval import get_regulation_expert
from agents.src.compliance_agent.evaluator import compliance_agent
from agents.src.human_review_agent.queue import human_review_agent
from agents.src.audit_agent.activity import audit_logger

async def vision_router_node(state: AgentState) -> Dict[str, Any]:
    print("--- NODE: VISION ROUTER ---")
    result = await vision_router.process_document(state["file_path"])
    await audit_logger.log_event("ocr_extraction", "vision_router", result)
    return {
        "extracted_data": result, 
        "confidence": {"ocr": result.get("confidence", 0)},
        "status": "MANUAL_REVIEW" if result.get("needs_escalation") else "PROCESSING"
    }

def safety_agent_node(state: AgentState) -> Dict[str, Any]:
    print("--- NODE: SAFETY AGENT ---")
    result = safety_agent.extract_and_mask(state["extracted_data"])
    return {"extracted_data": {**state["extracted_data"], **result}, "pii_masked": True}

async def compliance_evaluator_node(state: AgentState) -> Dict[str, Any]:
    print("--- NODE: COMPLIANCE EVALUATOR ---")
    expert = get_regulation_expert()
    regs = await expert.get_relevant_regulations("Passport", "renewal")
    result = await compliance_agent.evaluate(state["extracted_data"], regs)
    await audit_logger.log_event("compliance_check", "compliance_agent", result)
    return {"status": result["status"], "findings": result["findings"]}

async def human_review_node(state: AgentState) -> Dict[str, Any]:
    print("--- NODE: HUMAN REVIEW ESCALATION ---")
    reason = "Low OCR confidence" if state["confidence"].get("ocr", 0) < 0.6 else "Compliance failure"
    await human_review_agent.submit_to_queue(state, reason)
    return {"status": "MANUAL_REVIEW"}

def route_after_vision(state: AgentState) -> Literal["safety_agent", "human_review"]:
    if state["status"] == "MANUAL_REVIEW":
        return "human_review"
    return "safety_agent"

def route_after_compliance(state: AgentState) -> Literal["human_review", "end"]:
    if state["status"] == "MANUAL_REVIEW":
        return "human_review"
    return "end"

def create_orchestrator():
    workflow = StateGraph(AgentState)

    # Add Nodes
    workflow.add_node("vision_router", vision_router_node)
    workflow.add_node("safety_agent", safety_agent_node)
    workflow.add_node("compliance_evaluator", compliance_evaluator_node)
    workflow.add_node("human_review", human_review_node)

    # Add Edges
    workflow.set_entry_point("vision_router")
    
    workflow.add_conditional_edges(
        "vision_router",
        route_after_vision,
        {
            "safety_agent": "safety_agent",
            "human_review": "human_review"
        }
    )
    
    workflow.add_edge("safety_agent", "compliance_evaluator")
    
    workflow.add_conditional_edges(
        "compliance_evaluator",
        route_after_compliance,
        {
            "human_review": "human_review",
            "end": END
        }
    )
    
    workflow.add_edge("human_review", END)

    return workflow.compile()

orchestrator = create_orchestrator()
