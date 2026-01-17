from textual.app import ComposeResult
from textual.screen import Screen
from textual.widgets import Header, Footer, Static
from textual.containers import Container

from gae_dev_console.widgets.status import SystemHealthPanel

class DashboardScreen(Screen):
    """The main dashboard screen."""
    
    def compose(self) -> ComposeResult:
        yield Header()
        yield Container(
            Static("GovAssist Ethiopia Developer Console", id="dashboard-title"),
            SystemHealthPanel(),
            id="dashboard-container"
        )
        yield Footer()