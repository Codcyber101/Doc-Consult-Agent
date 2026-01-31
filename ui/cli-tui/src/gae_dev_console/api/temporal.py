from typing import List, Optional, Any
from temporalio.client import Client
from gae_dev_console.config import config


class TemporalClientWrapper:
    """Wrapper around the Temporal Client for easier usage in TUI."""

    def __init__(self, target_url: Optional[str] = None):
        self.target_url = target_url or config.TEMPORAL_URL
        self._client: Optional[Client] = None

    async def connect(self) -> Client:
        """Connect to the Temporal server."""
        if self._client is None:
            self._client = await Client.connect(self.target_url)
        return self._client

    async def list_workflows(
        self, query: str = "ExecutionStatus='Running'"
    ) -> List[Any]:
        """List workflows matching the query."""
        try:
            client = await self.connect()
            # Note: This is a simplified listing. Production usage might need pagination.
            # list_workflows returns an async iterator.
            workflows = []
            async for wf in client.list_workflows(query=query):
                workflows.append(wf)
            return workflows
        except Exception as e:
            # Handle connection errors gracefully
            print(f"Error listing workflows: {e}")
            return []

    async def get_workflow_handle(self, workflow_id: str, run_id: Optional[str] = None):
        client = await self.connect()
        return client.get_workflow_handle(workflow_id, run_id=run_id)

    async def check_health(self) -> bool:
        """Simple health check by trying to connect."""
        try:
            await self.connect()
            await self._client.service_client.get_system_info()  # type: ignore
            return True
        except Exception:
            return False


# Singleton instance
temporal_client = TemporalClientWrapper()
