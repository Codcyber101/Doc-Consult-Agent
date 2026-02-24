import pytest
from unittest.mock import MagicMock, patch
from human_review_agent.queue import HumanReviewAgent


@pytest.mark.asyncio
async def test_submit_to_queue():
    agent = HumanReviewAgent()

    state = {
        "document_id": "doc_123",
        "file_path": "/tmp/doc.jpg",
        "extracted_data": {},
    }

    with patch("httpx.AsyncClient.post") as mock_post:
        mock_response = MagicMock()
        mock_response.status_code = 201
        mock_post.return_value = mock_response

        result = await agent.submit_to_queue(state, "Low Confidence")

        assert result["status"] == "PENDING_REVIEW"
        assert result["reason"] == "Low Confidence"
        mock_post.assert_called_once()
