import aiohttp
from typing import Any, Dict, Optional
from gae_dev_console.config import config


class ApiClient:
    """Async client for the GovAssist Ethiopia Backend API."""

    def __init__(self, base_url: Optional[str] = None):
        self.base_url = base_url or config.BACKEND_URL
        self._session: Optional[aiohttp.ClientSession] = None

    async def _get_session(self) -> aiohttp.ClientSession:
        import asyncio

        loop = asyncio.get_running_loop()
        if self._session is None or self._session.closed or self._session._loop != loop:
            if self._session and not self._session.closed:
                await self._session.close()
            self._session = aiohttp.ClientSession()
        return self._session

    async def close(self):
        if self._session and not self._session.closed:
            await self._session.close()

    async def get_system_health(self) -> Dict[str, Any]:
        """Fetch system health status."""
        session = await self._get_session()
        try:
            async with session.get(f"{self.base_url}/health") as response:
                if response.status == 200:
                    return await response.json()
                return {"status": "error", "code": response.status}
        except Exception as e:
            return {"status": "unreachable", "error": str(e)}

    async def trigger_agent(
        self, agent_name: str, payload: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Trigger a specific agent with a payload."""
        session = await self._get_session()
        url = f"{self.base_url}/agents/{agent_name}/run"
        try:
            async with session.post(url, json=payload) as response:
                return await response.json()
        except Exception as e:
            return {"status": "error", "error": str(e)}


# Singleton instance
api_client = ApiClient()
