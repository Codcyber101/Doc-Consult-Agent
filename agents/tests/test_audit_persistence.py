import pytest
import json
import os
from audit_agent.activity import AuditLogger


@pytest.mark.asyncio
async def test_audit_persistence(tmp_path):
    log_file = tmp_path / "audit.jsonl"
    logger = AuditLogger(log_file=str(log_file))

    details = {"action": "test", "user": "admin"}
    await logger.log_event("TEST_EVENT", "system", details)

    assert os.path.exists(log_file)

    with open(log_file, "r") as f:
        line = f.readline()
        entry = json.loads(line)

        assert entry["event_type"] == "TEST_EVENT"
        assert entry["actor"] == "system"
        assert "signature" in entry
