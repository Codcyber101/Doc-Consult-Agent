from datetime import timedelta
from temporalio import workflow
from temporalio.common import RetryPolicy

with workflow.unsafe.imports_passed():
    from .graph import create_graph

@workflow.defn
class ResearchWorkflow:
    @workflow.run
    async def run(self, job_id: str, query: str) -> dict:
        graph = create_graph()
        # Initial state
        inputs = {"query": query, "urls": [], "documents": [], "draft_policy": "", "sources": [], "confidence_score": 0.0}
        
        # Execute LangGraph
        result = await graph.ainvoke(inputs)
        
        return {
            "job_id": job_id,
            "draft_policy": result["draft_policy"],
            "sources": result["sources"],
            "confidence_score": result["confidence_score"]
        }
