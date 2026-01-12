import asyncio
import os
from temporalio.client import Client
from temporalio.worker import Worker
from policy_research_agent.workflows import ResearchWorkflow

async def main():
    # Connect to Temporal
    temporal_host = os.getenv("TEMPORAL_HOST", "localhost:7233")
    client = await Client.connect(temporal_host)

    # Run the worker
    worker = Worker(
        client,
        task_queue="policy-research-tasks",
        workflows=[ResearchWorkflow],
        activities=[],
    )
    print("Worker started...")
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())