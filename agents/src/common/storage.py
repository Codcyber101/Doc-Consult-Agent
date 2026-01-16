import weaviate
import os
from weaviate.classes.config import Property, DataType, Configure

class WeaviateStorage:
    def __init__(self, url=None):
        self.url = url or os.getenv("WEAVIATE_URL", "http://localhost:8080")
        self.client = weaviate.connect_to_local(
            host="localhost",
            port=8080,
            grpc_port=50051
        )

    def init_schema(self):
        """Initializes the RegulationSnippet class in Weaviate."""
        if self.client.collections.exists("RegulationSnippet"):
            return

        self.client.collections.create(
            name="RegulationSnippet",
            properties=[
                Property(name="document_id", data_type=DataType.TEXT),
                Property(name="content", data_type=DataType.TEXT),
                Property(name="metadata", data_type=DataType.TEXT), # JSON stringified
            ],
            vectorizer_config=Configure.Vectorizer.none() # We will provide vectors or use native BM25
        )

    def close(self):
        self.client.close()

if __name__ == "__main__":
    storage = WeaviateStorage()
    try:
        storage.init_schema()
        print("Weaviate schema initialized successfully.")
    finally:
        storage.close()