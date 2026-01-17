from typing import Dict, Any, Optional
from datetime import datetime
import json
import os

class CostMonitor:
    """
    Tracks token usage and estimated costs for LLM operations.
    Supports session-level and daily-level tracking.
    """

    # Mock rates (USD per 1M tokens) - Adjust based on Groq/Provider actuals
    RATES = {
        "llama-3.1-70b-versatile": {"input": 0.59, "output": 0.79},
        "default": {"input": 0.50, "output": 0.50}
    }

    def __init__(self, storage_path: str = "/tmp/gae_usage.json"):
        self.storage_path = storage_path
        self._load_usage()

    def _load_usage(self):
        if os.path.exists(self.storage_path):
            try:
                with open(self.storage_path, "r") as f:
                    self.usage_data = json.load(f)
            except Exception:
                self.usage_data = {}
        else:
            self.usage_data = {}

    def _save_usage(self):
        try:
            with open(self.storage_path, "w") as f:
                json.dump(self.usage_data, f)
        except Exception as e:
            print(f"[COST MONITOR] Error saving usage: {e}")

    def track_usage(self, model: str, input_tokens: int, output_tokens: int, session_id: Optional[str] = None):
        """Records usage for a specific model call."""
        date_str = datetime.utcnow().strftime("%Y-%m-%d")
        
        # Initialize day if not exists
        if date_str not in self.usage_data:
            self.usage_data[date_str] = {"total_tokens": 0, "total_cost": 0.0, "sessions": {}}
        
        day_data = self.usage_data[date_str]
        
        # Calculate cost
        rates = self.RATES.get(model, self.RATES["default"])
        cost = (input_tokens / 1_000_000 * rates["input"]) + (output_tokens / 1_000_000 * rates["output"])
        
        # Update daily totals
        day_data["total_tokens"] += (input_tokens + output_tokens)
        day_data["total_cost"] += cost
        
        # Update session totals
        if session_id:
            if session_id not in day_data["sessions"]:
                day_data["sessions"][session_id] = {"tokens": 0, "cost": 0.0}
            day_data["sessions"][session_id]["tokens"] += (input_tokens + output_tokens)
            day_data["sessions"][session_id]["cost"] += cost
            
        self._save_usage()
        return cost

    def get_daily_usage(self) -> Dict[str, Any]:
        date_str = datetime.utcnow().strftime("%Y-%m-%d")
        return self.usage_data.get(date_str, {"total_tokens": 0, "total_cost": 0.0, "sessions": {}})

cost_monitor = CostMonitor()
