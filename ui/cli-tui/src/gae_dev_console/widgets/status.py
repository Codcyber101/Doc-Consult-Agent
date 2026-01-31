from textual.app import ComposeResult
from textual.containers import Container
from textual.widgets import Static
from textual.reactive import reactive
from textual import work

from gae_dev_console.api.client import api_client
from gae_dev_console.api.temporal import temporal_client


class ServiceStatus(Static):
    """A widget to display the status of a single service."""

    status = reactive("Checking...")
    is_online = reactive(False)

    DEFAULT_CSS = """
    ServiceStatus {
        border: solid gray;
        height: auto;
        padding: 1;
        margin: 1;
    }
    ServiceStatus.online {
        border: solid green;
        color: green;
    }
    ServiceStatus.offline {
        border: solid red;
        color: red;
    }
    """

    def __init__(self, service_name: str, check_callback, **kwargs):
        super().__init__(**kwargs)
        self.service_name = service_name
        self.check_callback = check_callback

    def compose(self) -> ComposeResult:
        yield Static(f"[{self.service_name}]", classes="service-title")
        yield Static(self.status, id="status-text")

    def on_mount(self) -> None:
        self.check_status()

    @work(exclusive=True)
    async def check_status(self) -> None:
        self.status = "Checking..."
        try:
            is_healthy = await self.check_callback()
            self.is_online = is_healthy
            self.status = "ONLINE" if is_healthy else "OFFLINE"
        except Exception as e:
            self.is_online = False
            self.status = f"ERROR: {str(e)}"

        self.refresh_classes()

    def watch_is_online(self, is_online: bool) -> None:
        self.remove_class("online", "offline")
        if is_online:
            self.add_class("online")
        else:
            self.add_class("offline")

    def refresh_classes(self):
        self.watch_is_online(self.is_online)


class SystemHealthPanel(Container):
    """Panel containing status widgets for all major services."""

    DEFAULT_CSS = """
    SystemHealthPanel {
        layout: horizontal;
        height: auto;
    }
    """

    def compose(self) -> ComposeResult:
        yield ServiceStatus("Backend API", self.check_backend)
        yield ServiceStatus("Temporal", self.check_temporal)

    async def check_backend(self) -> bool:
        # We assume get_system_health returns a dict, and if 'status' is not error, it's ok.
        # But for now, get_system_health isn't fully implemented on backend,
        # so we might get 'unreachable'.
        # For this widget, let's treat any response that is not 'unreachable' as sort of online,
        # or check the specific 'status' key.
        health = await api_client.get_system_health()
        return health.get("status") != "unreachable"

    async def check_temporal(self) -> bool:
        return await temporal_client.check_health()
