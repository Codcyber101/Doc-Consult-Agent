import requests
from bs4 import BeautifulSoup
from typing import List, Dict
import re

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
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            if "application/pdf" in response.headers.get("Content-Type", ""):
                return "[PDF content extraction not implemented in this stub]"
            
            soup = BeautifulSoup(response.text, "html.parser")
            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.decompose()
            
            return soup.get_text(separator=' ', strip=True)
        except Exception as e:
            return f"Error crawling {url}: {str(e)}"

    def search_topics(self, topic: str) -> List[str]:
        """Mock search for relevant URLs on a topic."""
        # In production, this would use a search engine API restricted to the allowlist
        return [f"https://ethiopian-law.com/search?q={topic.replace(' ', '+')}"]