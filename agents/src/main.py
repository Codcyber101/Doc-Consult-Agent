import asyncio
import os
from temporalio.client import Client
from temporalio.worker import Worker, UnsandboxedWorkflowRunner
from policy_research_agent.workflows import ResearchWorkflow

async def main():
    # Connect to Temporal
    temporal_host = os.getenv("TEMPORAL_HOST", "localhost:7233")
    if os.getenv("NODE_ENV") == "production" and temporal_host == "localhost:7233":
        raise RuntimeError("TEMPORAL_HOST must be set in production.")
    client = await Client.connect(temporal_host)

    # Run the worker with unsandboxed runner for complex agentic workflows
    worker = Worker(
        client,
        task_queue="policy-research-tasks",
        workflows=[ResearchWorkflow],
        activities=[],
        workflow_runner=UnsandboxedWorkflowRunner(),
    )
    print("Worker started...")
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())
