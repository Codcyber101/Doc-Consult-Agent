import pytesseract
from PIL import Image
from typing import Dict, Any
from agents.src.common.state import AgentState

class VisionRouter:
    """
    Handles OCR and initial document classification.
    Decides between local Tesseract and advanced Vision models.
    """
    
    def process_document(self, file_path: str) -> Dict[str, Any]:
        """Performs OCR and returns extracted text and metadata."""
        try:
            # Load image
            img = Image.open(file_path)
            
            # Perform OCR (Configured for English and Amharic if trained data exists)
            # In a real setup, we'd ensure 'amh' is in the lang string
            text = pytesseract.image_to_string(img, lang='eng+amh')
            
            # Calculate confidence (simplified mock)
            confidence = 0.85 if len(text) > 50 else 0.4
            
            return {
                "raw_text": text,
                "confidence": confidence,
                "method": "local_tesseract",
                "needs_escalation": confidence < 0.6
            }
        except Exception as e:
            print(f"[VISION ERROR] {e}")
            return {"error": str(e), "confidence": 0, "needs_escalation": True}

vision_router = VisionRouter()
