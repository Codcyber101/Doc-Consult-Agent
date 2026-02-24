import os
from typing import List
from firecrawl import FirecrawlApp


class PolicyCrawlTool:
    def __init__(self, allowlist: List[str] = None):
        self.allowlist = allowlist or [
            "nbe.gov.et",
            "ethiopian-law.com",
            "chilot.me",
            "addisababa.gov.et",
        ]
        self.api_key = os.getenv("FIRECRAWL_API_KEY")
        if not self.api_key:
            # Fallback or warning? For now, we assume it's set or we handle the error at runtime.
            pass

    def is_allowed(self, url: str) -> bool:
        """Checks if the URL is in the allowlist."""
        return any(domain in url for domain in self.allowlist)

    def crawl_text(self, url: str) -> str:
        """Fetches and extracts text from a URL if allowed, using Firecrawl."""
        if not self.is_allowed(url):
            raise ValueError(f"URL {url} is not in the allowlist.")

        if not self.api_key:
            raise ValueError("FIRECRAWL_API_KEY environment variable is not set.")

        try:
            app = FirecrawlApp(api_key=self.api_key)
            # Scrape the URL
            scrape_result = app.scrape_url(url, params={"formats": ["markdown"]})
            if "markdown" in scrape_result:
                return scrape_result["markdown"]
            return str(scrape_result)
        except Exception as e:
            return f"Error crawling {url}: {str(e)}"

    def search_topics(self, topic: str) -> List[str]:
        """
        Search for relevant URLs on a topic within the allowlist.
        In production, this calls SearxNG or Google Custom Search.
        """
        # Improved mock: restricted to allowlist domains
        return [
            f"https://ethiopian-law.com/search?q={topic.replace(' ', '+')}",
            f"https://chilot.me/?s={topic.replace(' ', '+')}",
        ]
