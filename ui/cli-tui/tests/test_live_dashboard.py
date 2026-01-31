import pytest
import os
from gae_dev_console.app import GaeDevConsoleApp
from gae_dev_console.widgets.status import ServiceStatus


@pytest.mark.asyncio
async def test_dashboard_live_status():
    if os.getenv("GAE_TEST_LIVE") != "true":
        pytest.skip("Skipping live test.")

    app = GaeDevConsoleApp()
    async with app.run_test() as pilot:
        await pilot.pause()
        await pilot.pause()
        await pilot.pause()  # Give it time for both pings

        statuses = app.screen.query(ServiceStatus)
        assert len(statuses) == 2

        backend_status = statuses[0]
        temporal_status = statuses[1]

        print(f"Backend Status: {backend_status.status}")
        print(f"Temporal Status: {temporal_status.status}")

        assert backend_status.status == "ONLINE"
        # Temporal might be ONLINE if it connected, or OFFLINE if network issue
        # But infra-temporal-1 is running.
        assert temporal_status.status == "ONLINE"
