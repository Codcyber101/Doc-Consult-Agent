import asyncio
import os
from temporalio.client import Client
from temporalio.worker import Worker, UnsandboxedWorkflowRunner
from policy_research_agent.workflows import ResearchWorkflow
from orchestrator.document_analysis_workflow import DocumentAnalysisWorkflow, run_document_analysis

async def main():
    # Connect to Temporal
    temporal_host = os.getenv("TEMPORAL_HOST", "localhost:7233")
    if os.getenv("NODE_ENV") == "production" and temporal_host == "localhost:7233":
        raise RuntimeError("TEMPORAL_HOST must be set in production.")
    client = await Client.connect(temporal_host)

    # Run the worker with unsandboxed runner for complex agentic workflows
    worker = Worker(
        client,
        task_queue=os.getenv("TEMPORAL_TASK_QUEUE", "govassist-tasks"),
        workflows=[ResearchWorkflow, DocumentAnalysisWorkflow],
        activities=[run_document_analysis],
        workflow_runner=UnsandboxedWorkflowRunner(),
    )
    print("Worker started...")
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())
