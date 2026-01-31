import pytest
import os
from unittest.mock import AsyncMock, patch


@pytest.fixture
def mock_api_client():
    if os.getenv("GAE_TEST_LIVE") == "true":
        return None  # Should not be used in live tests
    mock = AsyncMock()
    # Default behavior
    mock.get_system_health.return_value = {"status": "ok"}
    mock.trigger_agent.return_value = {"result": "success"}
    return mock


@pytest.fixture
def mock_temporal_client():
    if os.getenv("GAE_TEST_LIVE") == "true":
        return None
    mock = AsyncMock()
    mock.list_workflows.return_value = []
    mock.check_health.return_value = True
    return mock


@pytest.fixture(autouse=True)
def patch_clients(mock_api_client, mock_temporal_client):
    """Patch the singleton clients in all modules where they are used."""
    if os.getenv("GAE_TEST_LIVE") == "true":
        yield
        return

    # We use a list of targets to patch
    api_targets = [
        "gae_dev_console.api.client.api_client",
        "gae_dev_console.widgets.status.api_client",
        "gae_dev_console.screens.agent_runner.api_client",
    ]

    temporal_targets = [
        "gae_dev_console.api.temporal.temporal_client",
        "gae_dev_console.widgets.status.temporal_client",
        "gae_dev_console.widgets.workflows.temporal_client",
    ]

    patches = []

    for target in api_targets:
        p = patch(target, mock_api_client)
        patches.append(p)
        p.start()

    for target in temporal_targets:
        p = patch(target, mock_temporal_client)
        patches.append(p)
        p.start()

    yield

    for p in patches:
        p.stop()
