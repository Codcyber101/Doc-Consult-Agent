import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # API Keys
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Database / Vector Store
    WEAVIATE_URL: str = os.getenv("WEAVIATE_URL", "http://localhost:8080")
    POSTGRES_URL: str = os.getenv("POSTGRES_URL", "postgresql://user:pass@localhost:5432/gae")
    
    # Storage
    MINIO_URL: str = os.getenv("MINIO_URL", "localhost:9000")
    MINIO_ACCESS_KEY: str = os.getenv("MINIO_ACCESS_KEY", "minioadmin")
    MINIO_SECRET_KEY: str = os.getenv("MINIO_SECRET_KEY", "minioadmin")
    
    # Temporal
    TEMPORAL_URL: str = os.getenv("TEMPORAL_URL", "localhost:7233")
    
    # HSM / Signing (Placeholders)
    SIGNING_KEY_ID: str = os.getenv("SIGNING_KEY_ID", "default-key")
    
    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

settings = Settings()
