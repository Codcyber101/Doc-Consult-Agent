from typing import Tuple
from agents.src.cost_control_agent.monitor import cost_monitor

class BudgetEnforcer:
    """
    Enforces budget constraints on LLM operations.
    """

    def __init__(self, daily_limit_usd: float = 5.0, session_limit_usd: float = 0.5):
        self.daily_limit_usd = daily_limit_usd
        self.session_limit_usd = session_limit_usd

    def is_allowed(self, session_id: str = None) -> Tuple[bool, str]:
        """
        Checks if the current usage is within limits.
        Returns (is_allowed, reason).
        """
        usage = cost_monitor.get_daily_usage()
        
        # Check daily limit
        if usage["total_cost"] >= self.daily_limit_usd:
            return False, f"Daily budget limit of ${self.daily_limit_usd} reached."
        
        # Check session limit
        if session_id and session_id in usage["sessions"]:
            if usage["sessions"][session_id]["cost"] >= self.session_limit_usd:
                return False, f"Session budget limit of ${self.session_limit_usd} reached."
        
        return True, "Within budget"

budget_enforcer = BudgetEnforcer()
