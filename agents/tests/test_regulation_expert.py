import pytest
from unittest.mock import MagicMock, patch
from src.regulation_expert.retrieval import HybridRetriever

@pytest.fixture
def retriever():
    with patch("src.regulation_expert.retrieval.weaviate.connect_to_local") as mock_connect:
        return HybridRetriever()

@pytest.mark.asyncio
async def test_retrieval_logic(retriever):
    # Mock Weaviate Collection and Query
    mock_collection = MagicMock()
    mock_response = MagicMock()
    
    # Mocking Weaviate v4 query structure
    mock_obj = MagicMock()
    mock_obj.uuid = "uuid-123"
    mock_obj.properties = {"content": "Sample Regulation", "document_id": "doc-1"}
    mock_response.objects = [mock_obj]
    
    mock_collection.query.hybrid.return_value = mock_response
    retriever.client.collections.get.return_value = mock_collection
    
    results = retriever.retrieve("Taxes")
    
    assert len(results) == 1
    assert results[0]["content"] == "Sample Regulation"
    mock_collection.query.hybrid.assert_called_once()

@pytest.mark.asyncio
async def test_get_relevant_regulations(retriever):
    with patch.object(retriever, "retrieve", return_value=[{"id": "1", "content": "Test"}]) as mock_retrieve:
        results = await retriever.get_relevant_regulations("Passport", "renewal")
        assert len(results) == 1
        mock_retrieve.assert_called_once_with("Regulations for Passport renewal")
