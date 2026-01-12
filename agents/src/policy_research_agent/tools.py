from typing import List
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_community.document_loaders import AsyncHtmlLoader, PyPDFLoader
from langchain_community.document_transformers import Html2TextTransformer

def get_search_tool():
    return TavilySearchResults(max_results=5)

async def scrape_urls(urls: List[str]):
    loader = AsyncHtmlLoader(urls)
    docs = loader.load()
    html2text = Html2TextTransformer()
    return html2text.transform_documents(docs)

def load_pdf(file_path: str):
    loader = PyPDFLoader(file_path)
    return loader.load()

def is_domain_allowed(url: str, allowlist: List[str]) -> bool:
    from urllib.parse import urlparse
    domain = urlparse(url).netloc
    for allowed in allowlist:
        if allowed.startswith("*."):
            suffix = allowed[2:]
            if domain == suffix or domain.endswith("." + suffix):
                return True
        elif domain == allowed:
            return True
    return False
