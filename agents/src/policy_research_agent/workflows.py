import yaml
from typing import Dict, List

class PolicyDraftGenerator:
    def __init__(self):
        # Higher index means higher priority
        self.hierarchy = ["Guideline", "Directive", "Regulation", "Proclamation"]
from .graph import create_graph

    def prioritize_rules(self, rules: List[Dict]) -> List[Dict]:
        """Sorts rules based on legal hierarchy."""
        def get_rank(rule):
            source_type = rule.get("type", "Guideline")
            return self.hierarchy.index(source_type) if source_type in self.hierarchy else 0
        
        return sorted(rules, key=get_rank, reverse=True)

    def generate_yaml(self, title: str, jurisdiction: str, rules: List[Dict]) -> str:
        """Generates a valid Policy YAML."""
        sorted_rules = self.prioritize_rules(rules)
        data = {
            "title": title,
            "jurisdiction": jurisdiction,
            "effective_date": "2026-01-16",
            "rules": sorted_rules,
            "status": "DRAFT"
        }
        return yaml.dump(data, allow_unicode=True)

    def validate_schema(self, yaml_content: str) -> bool:
        """Validates the YAML against the Policy Registry schema."""
        try:
            data = yaml.safe_load(yaml_content)
            required = ["title", "jurisdiction", "rules"]
            return all(k in data for k in required)
        except Exception:
            return False