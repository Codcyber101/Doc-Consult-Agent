from textual.app import ComposeResult
from textual.screen import Screen
from textual.widgets import Header, Footer, Static, Button, TextArea, Select, Label
from textual.containers import Container, Horizontal
from textual import work
import json

from gae_dev_console.api.client import api_client


class AgentRunnerScreen(Screen):
    """Screen for running agents manually."""

    AGENTS = [
        ("compliance-agent", "Compliance Agent"),
        ("policy-research-agent", "Policy Research Agent"),
        ("document-analyzer", "Document Analyzer"),
    ]

    def compose(self) -> ComposeResult:
        yield Header()
        yield Container(
            Static("Agent Runner", classes="screen-title"),
            Horizontal(
                Label("Select Agent:"),
                Select(
                    [(name, id) for id, name in self.AGENTS],
                    prompt="Choose Agent",
                    id="agent-select",
                ),
                classes="form-row",
            ),
            Label("Input Payload (JSON):"),
            TextArea('{"test": true}', language="json", id="json-input"),
            Button("Run Agent", variant="primary", id="run-btn"),
            Label("Output:"),
            TextArea("", language="json", read_only=True, id="json-output"),
            id="runner-container",
        )
        yield Footer()

    @work(exclusive=True)
    async def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "run-btn":
            agent_select = self.query_one("#agent-select", Select)
            json_input = self.query_one("#json-input", TextArea)
            json_output = self.query_one("#json-output", TextArea)

            if agent_select.value == Select.BLANK:
                json_output.text = "Error: Please select an agent."
                return

            try:
                payload = json.loads(json_input.text)
                json_output.text = "Running..."

                result = await api_client.trigger_agent(
                    str(agent_select.value), payload
                )
                json_output.text = json.dumps(result, indent=2)
            except json.JSONDecodeError:
                json_output.text = "Error: Invalid JSON input."
            except Exception as e:
                json_output.text = f"Error: {str(e)}"
