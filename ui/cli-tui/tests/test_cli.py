from typer.testing import CliRunner
from gae_dev_console.cli import app

runner = CliRunner()

def test_status_command():
    result = runner.invoke(app, ["status"])
    assert result.exit_code == 0
    assert "GovAssist Developer Console" in result.stdout
    assert "Environment: development" in result.stdout
