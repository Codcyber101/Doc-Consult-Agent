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