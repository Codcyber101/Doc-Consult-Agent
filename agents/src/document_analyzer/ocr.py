import pytesseract
from PIL import Image
import io

class DocumentAnalyzer:
    def analyze(self, image_bytes):
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)
        # Mock confidence and layout
        return {
            "text": text,
            "confidence": 0.85,
            "fields": {
                "document_number": "12345",
                "expiry_date": "2027-01-01"
            }
        }
