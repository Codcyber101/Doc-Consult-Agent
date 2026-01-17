from typing import List, Dict
import weaviate
import os

class HybridRetriever:
    def __init__(self, collection_name: str = "RegulationSnippet"):
        self.collection_name = collection_name
        self.client = weaviate.connect_to_local()

    def retrieve(self, query: str, limit: int = 5) -> List[Dict]:
        """Performs hybrid search (Vector + BM25)."""
        collection = self.client.collections.get(self.collection_name)
        
        # Hybrid search using Weaviate v4 API
        response = collection.query.hybrid(
            query=query,
            limit=limit,
            alpha=0.5 # Balance between Vector (1.0) and BM25 (0.0)
        )
        
        results = []
        for obj in response.objects:
            results.append({
                "id": str(obj.uuid),
                "content": obj.properties.get("content"),
                "document_id": obj.properties.get("document_id"),
                "metadata": obj.properties.get("metadata")
            })
        return results

    def close(self):
        self.client.close()

    async def get_relevant_regulations(self, service: str, action: str) -> List[Dict]:
        """Convenience method for orchestrator to fetch relevant regulations."""
        query = f"Regulations for {service} {action}"
        # For now, just call retrieve. In production, this might have more logic.
        return self.retrieve(query)

# Use a function to get the expert instance to avoid connection at import time
_regulation_expert = None

def get_regulation_expert():
    global _regulation_expert
    if _regulation_expert is None:
        _regulation_expert = HybridRetriever()
    return _regulation_expert