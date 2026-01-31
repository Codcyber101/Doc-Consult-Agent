import pytest
from gae_dev_console.app import GaeDevConsoleApp
from gae_dev_console.widgets.status import ServiceStatus


@pytest.mark.asyncio
async def test_dashboard_status_online(mock_api_client, mock_temporal_client):
    # Setup mocks for success
    mock_api_client.get_system_health.return_value = {"status": "ok"}
    mock_temporal_client.check_health.return_value = True

    app = GaeDevConsoleApp()
    async with app.run_test() as pilot:
        # Wait for workers to complete (check_status is a worker)
        await pilot.pause()
        await pilot.pause()

        # Check for "Backend API" status
        # We need to find the widgets. The IDs are not unique per service, so we look by class or content.
        # But ServiceStatus has classes based on state.

        statuses = app.screen.query(ServiceStatus)
        assert len(statuses) == 2

        backend_status = statuses[0]
        temporal_status = statuses[1]

        assert backend_status.service_name == "Backend API"
        assert backend_status.status == "ONLINE"
        assert backend_status.has_class("online")

        assert temporal_status.service_name == "Temporal"
        assert temporal_status.status == "ONLINE"
        assert temporal_status.has_class("online")


@pytest.mark.asyncio
async def test_dashboard_status_offline(mock_api_client, mock_temporal_client):
    # Setup mocks for failure
    mock_api_client.get_system_health.return_value = {"status": "unreachable"}
    mock_temporal_client.check_health.return_value = False

    app = GaeDevConsoleApp()
    async with app.run_test() as pilot:
        await pilot.pause()
        await pilot.pause()

        statuses = app.screen.query(ServiceStatus)

        backend_status = statuses[0]
        assert (
            backend_status.status == "OFFLINE"
            or backend_status.status == "unreachable"
            or "unreachable" in backend_status.status
        )
        # Based on logic: status != unreachable -> online. So status == unreachable -> False -> OFFLINE
        assert backend_status.has_class("offline")

        temporal_status = statuses[1]
        assert temporal_status.status == "OFFLINE"
        assert temporal_status.has_class("offline")
