import pytest
from unittest.mock import patch, mock_open
import yaml
from procedural_guide.guide import ProceduralGuideAgent


@pytest.fixture
def guide_agent():
    return ProceduralGuideAgent(registry_path="/tmp/registry")


def test_get_playbook_success(guide_agent):
    playbook_data = {
        "id": "trade-license",
        "steps": [{"id": "step1", "title": "Apply"}],
    }
    yaml_content = yaml.dump(playbook_data)

    with (
        patch("os.path.exists", return_value=True),
        patch("builtins.open", mock_open(read_data=yaml_content)),
    ):
        playbook = guide_agent.get_playbook("addis-ababa", "trade-license")
        assert playbook["id"] == "trade-license"
        assert len(playbook["steps"]) == 1


def test_get_next_step(guide_agent):
    playbook = {
        "steps": [{"id": "step1", "title": "Apply"}, {"id": "step2", "title": "Pay"}]
    }

    # 1. No steps completed
    result = guide_agent.get_next_step(playbook, [])
    assert result["step"]["id"] == "step1"
    assert result["is_complete"] is False

    # 2. One step completed
    result = guide_agent.get_next_step(playbook, ["step1"])
    assert result["step"]["id"] == "step2"

    # 3. All steps completed
    result = guide_agent.get_next_step(playbook, ["step1", "step2"])
    assert result["is_complete"] is True


def test_evaluate_readiness(guide_agent):
    playbook = {"required_documents": ["TIN", "ID"]}

    # 1. Missing docs
    data = {"documents": ["TIN"]}
    result = guide_agent.evaluate_readiness(playbook, data)
    assert result["readiness_score"] == 0.5
    assert result["can_submit"] is False

    # 2. All docs found
    data = {"documents": ["TIN", "ID"]}
    result = guide_agent.evaluate_readiness(playbook, data)
    assert result["readiness_score"] == 1.0
    assert result["can_submit"] is True
