import pytest
from unittest.mock import MagicMock, patch
from src.portal_connector.client import PortalConnector

@pytest.mark.asyncio
async def test_portal_submission():
    connector = PortalConnector()
    payload = {"applicationType": "TradeLicense"}
    
    with patch("httpx.AsyncClient.post") as mock_post:
        mock_response = MagicMock()
        mock_response.status_code = 201
        mock_response.json.return_value = {"application_id": "REAL-ID-123"}
        mock_post.return_value = mock_response
        
        result = await connector.submit_application(payload)
        
        assert result["success"] is True
        assert result["tracking_id"] == "REAL-ID-123"
        assert result["status"] == "SUBMITTED"

@pytest.mark.asyncio
async def test_portal_submission_fallback():
    connector = PortalConnector()
    payload = {"applicationType": "TradeLicense"}
    
    with patch("httpx.AsyncClient.post") as mock_post:
        # Simulate portal down
        mock_post.side_effect = Exception("Connection Refused")
        
        result = await connector.submit_application(payload)
        
        assert result["success"] is True
        assert "MOCK-ERR-ACK" in result["tracking_id"]
        assert result["status"] == "SUBMITTED"
