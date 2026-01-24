import pytest
from unittest.mock import patch, AsyncMock
from src.vision_router.router import VisionRouter

@pytest.fixture
def vision_router():
    return VisionRouter()

@pytest.mark.asyncio
async def test_process_document_high_confidence(vision_router):
    """Test standard local OCR path."""
    with patch("src.vision_router.router.Image.open") as mock_open, \
         patch("src.vision_router.router.pytesseract.image_to_string") as mock_ocr:
        
        # Mock high confidence text (len > 100)
        mock_ocr.return_value = "A" * 150
        
        result = await vision_router.process_document("dummy.jpg")
        
        assert result["method"] == "local_tesseract"
        assert result["confidence"] >= 0.85
        assert result["needs_escalation"] is False

@pytest.mark.asyncio
async def test_process_document_low_confidence_fallback(vision_router):
    """Test fallback to Vision LLM when local OCR fails."""
    with patch("src.vision_router.router.Image.open") as mock_open, \
         patch("src.vision_router.router.pytesseract.image_to_string") as mock_ocr:
        
        # Mock low confidence text
        mock_ocr.return_value = "Blurry text"
        
        # Use simple object patching for the async method
        vision_router.process_with_vision_llm = AsyncMock(return_value={
            "raw_text": "Vision LLM Extracted",
            "confidence": 0.95,
            "method": "vision_llm"
        })
        
        result = await vision_router.process_document("dummy.jpg")
        
        assert result["method"] == "vision_llm"
        assert result["local_text"] == "Blurry text"
        # Check fallback was called
        vision_router.process_with_vision_llm.assert_called_once()
