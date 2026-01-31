import typer
from rich.console import Console
from gae_dev_console.app import run as run_tui
from gae_dev_console.config import config

app = typer.Typer(
    name="gae-dev",
    help="GovAssist Ethiopia Developer Console",
    add_completion=False,
)
console = Console()


@app.command()
def tui():
    """Launch the Terminal User Interface."""
    run_tui()


@app.command()
def status():
    """Check system health status."""
    console.print("[bold green]GovAssist Developer Console[/bold green]")
    console.print(f"Environment: [blue]{config.ENV}[/blue]")
    console.print(f"Backend URL: {config.BACKEND_URL}")
    console.print(f"Temporal URL: {config.TEMPORAL_URL}")
    # TODO: Add real health checks here in Phase 2


if __name__ == "__main__":
    app()
