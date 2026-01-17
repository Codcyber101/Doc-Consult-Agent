import yaml
from typing import Dict, List
from agents.src.common.llm import get_llm
from langchain_core.prompts import ChatPromptTemplate

class PolicyDraftGenerator:
    def __init__(self):
        # Higher index means higher priority
        self.hierarchy = ["Guideline", "Directive", "Regulation", "Proclamation"]
        self.llm = get_llm(temperature=0.2)

    async def draft_policy_from_research(self, topic: str, research_text: str) -> str:
        """Uses LLM to draft a Policy YAML based on research findings."""
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a Legal Policy Expert for GovAssist Ethiopia. "
                       "Based on the research provided, draft a Policy YAML. "
                       "The YAML should include: title, jurisdiction, effective_date, and a list of rules. "
                       "Each rule should have: id, title, type (Proclamation, Regulation, etc.), and content."),
            ("human", "Research Findings on {topic}:\n{research}")
        ])
        
        chain = prompt | self.llm
        response = await chain.ainvoke({"topic": topic, "research": research_text})
        
        # We assume the LLM returns valid YAML or YAML-ish text. 
        # In production, we'd add a parser/validator.
        return response.content

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