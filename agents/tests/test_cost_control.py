import pytest
from unittest.mock import patch
from src.cost_control_agent.monitor import CostMonitor
from src.cost_control_agent.enforcer import BudgetEnforcer

@pytest.fixture
def clean_cost_monitor(tmp_path):
    """Fixture to provide a fresh CostMonitor for each test."""
    db_path = tmp_path / "usage.json"
    monitor = CostMonitor(storage_path=str(db_path))
    # Reset singleton state if needed (though we are creating a new instance)
    monitor.usage_data = {}
    return monitor

def test_track_usage(clean_cost_monitor):
    """Test that usage is correctly tracked and accumulated."""
    monitor = clean_cost_monitor
    
    # Track first call
    monitor.track_usage("llama-3.1-70b-versatile", 1000, 500, "session_1")
    daily = monitor.get_daily_usage()
    
    assert daily["total_tokens"] == 1500
    assert "session_1" in daily["sessions"]
    assert daily["sessions"]["session_1"]["tokens"] == 1500
    
    # Track second call
    monitor.track_usage("llama-3.1-70b-versatile", 1000, 500, "session_1")
    daily = monitor.get_daily_usage()
    assert daily["total_tokens"] == 3000

def test_budget_enforcement(clean_cost_monitor):
    """Test that the enforcer correctly flags budget overruns."""
    # Inject our clean monitor into the enforcer's scope 
    # (In reality, enforcer imports the singleton, so we need to patch it)
    with patch("src.cost_control_agent.enforcer.cost_monitor", clean_cost_monitor):
        enforcer = BudgetEnforcer(daily_limit_usd=1.0, session_limit_usd=0.5)
        
        # 1. Under limit
        allowed, _ = enforcer.is_allowed("session_A")
        assert allowed is True
        
        # 2. Exceed Session Limit (Cost approx $1.00 for ~1.5M tokens)
        # Input: 0.59 per 1M, Output: 0.79 per 1M
        # 1M input = $0.59 -> Exceeds 0.5
        clean_cost_monitor.track_usage("llama-3.1-70b-versatile", 1_000_000, 0, "session_A")
        
        allowed, reason = enforcer.is_allowed("session_A")
        assert allowed is False
        assert "Session budget limit" in reason
        
        # 3. New session under daily limit?
        # Total cost is 0.59. Daily limit is 1.0. 
        allowed, _ = enforcer.is_allowed("session_B")
        assert allowed is True
        
        # 4. Exceed Daily Limit
        clean_cost_monitor.track_usage("llama-3.1-70b-versatile", 1_000_000, 0, "session_B")
        # Total cost now ~1.18
        
        allowed, reason = enforcer.is_allowed("session_C")
        assert allowed is False
        assert "Daily budget limit" in reason
