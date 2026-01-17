import requests
from bs4 import BeautifulSoup
from typing import List, Dict
import re
import io
from pypdf import PdfReader

class PolicyCrawlTool:
    def __init__(self, allowlist: List[str] = None):
        self.allowlist = allowlist or [
            "nbe.gov.et",
            "ethiopian-law.com",
            "chilot.me",
            "addisababa.gov.et"
        ]

    def is_allowed(self, url: str) -> bool:
        """Checks if the URL is in the allowlist."""
        return any(domain in url for domain in self.allowlist)

    def crawl_text(self, url: str) -> str:
        """Fetches and extracts text from a URL if allowed."""
        if not self.is_allowed(url):
            raise ValueError(f"URL {url} is not in the allowlist.")

        try:
            response = requests.get(url, timeout=15)
            response.raise_for_status()
            
            content_type = response.headers.get("Content-Type", "").lower()
            
            if "application/pdf" in content_type:
                return self._extract_pdf(response.content)
            
            soup = BeautifulSoup(response.text, "html.parser")
            for script in soup(["script", "style"]):
                script.decompose()
            
            return soup.get_text(separator=' ', strip=True)
        except Exception as e:
            return f"Error crawling {url}: {str(e)}"

    def _extract_pdf(self, content: bytes) -> str:
        """Extracts text from PDF content."""
        try:
            reader = PdfReader(io.BytesIO(content))
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            return text
        except Exception as e:
            return f"Error extracting PDF: {str(e)}"

    def search_topics(self, topic: str) -> List[str]:
        """
        Search for relevant URLs on a topic within the allowlist.
        In production, this calls SearxNG or Google Custom Search.
        """
        # Improved mock: restricted to allowlist domains
        return [
            f"https://ethiopian-law.com/search?q={topic.replace(' ', '+')}",
            f"https://chilot.me/?s={topic.replace(' ', '+')}"
        ]