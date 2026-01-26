import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()

@dataclass
class Config:
    """Configuration for the Developer Console."""
    BACKEND_URL: str = os.getenv("GAE_BACKEND_URL", "http://localhost:3000")
    TEMPORAL_URL: str = os.getenv("TEMPORAL_URL", "localhost:7233")
    ENV: str = os.getenv("GAE_ENV", "development")

config = Config()
