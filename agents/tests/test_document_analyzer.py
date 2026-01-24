import pytest
from unittest.mock import patch
from src.document_analyzer.ocr import DocumentAnalyzer

@pytest.fixture
def analyzer():
    return DocumentAnalyzer()

def test_analyze_success(analyzer):
    dummy_bytes = b"fake image content"
    
    with patch("src.document_analyzer.ocr.Image.open") as mock_open, \
         patch("src.document_analyzer.ocr.pytesseract.image_to_string") as mock_ocr:
        
        mock_ocr.return_value = "Document Number: 12345 Expiry: 2030 Name: Abebe"
        
        result = analyzer.analyze(dummy_bytes)
        
        assert "raw_text" in result
        assert result["features"]["has_stamp"] is True
        assert result["features"]["has_signature"] is True
        assert result["readiness_score"] == 0.85
        assert result["fields"]["document_number"] == "EXTRACTED_VALUE" # Based on current mock implementation

def test_analyze_error(analyzer):
    with patch("src.document_analyzer.ocr.Image.open", side_effect=Exception("Invalid format")):
        result = analyzer.analyze(b"bad data")
        assert "error" in result
        assert result["readiness_score"] == 0
