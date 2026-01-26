import pytesseract
from PIL import Image
from typing import Dict, Any

class VisionRouter:
    """
    Handles OCR and initial document classification.
    Decides between local Tesseract and advanced Vision models.
    """
    
    async def process_document(self, file_path: str) -> Dict[str, Any]:
        """Performs OCR and returns extracted text and metadata."""
        try:
            # 1. Local OCR Attempt
            img = Image.open(file_path)
            text = pytesseract.image_to_string(img, lang='eng+amh')
            
            # Simplified confidence heuristic
            confidence = 0.85 if len(text) > 100 else 0.4
            
            # 2. Fallback to Vision LLM if confidence is low
            if confidence < 0.6:
                print(f"[VISION] Low confidence ({confidence}), falling back to Vision LLM...")
                vision_result = await self.process_with_vision_llm(file_path)
                return {
                    **vision_result,
                    "local_text": text,
                    "needs_escalation": vision_result["confidence"] < 0.7
                }
            
            return {
                "raw_text": text,
                "confidence": confidence,
                "method": "local_tesseract",
                "needs_escalation": False
            }
        except Exception as e:
            print(f"[VISION ERROR] {e}")
            return {"error": str(e), "confidence": 0, "needs_escalation": True}

    async def process_with_vision_llm(self, file_path: str) -> Dict[str, Any]:
        """
        Uses a Vision-capable LLM to extract text from a document image.
        Note: Currently Groq has limited vision support. This is a placeholder 
        for an OpenAI/Anthropic or local Llama-Vision integration.
        """
        # In a real setup, we would encode the image to base64
        # and send it to a model like gpt-4o or llama-3.2-90b-vision-preview (if available on Groq)
        
        # Mocking the Vision LLM response for now
        # If the user has a vision-enabled model on Groq, we'd call it here.
        print(f"[VISION] Extracting from {file_path} using Vision LLM...")
        
        return {
            "raw_text": "[EXTRACTED BY VISION LLM] Sample text from document including stamps and signatures.",
            "confidence": 0.92,
            "method": "vision_llm",
            "metadata": {"has_stamp": True, "has_signature": True}
        }

vision_router = VisionRouter()
