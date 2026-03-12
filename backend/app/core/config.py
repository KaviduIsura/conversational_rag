import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings:
    """Application settings"""
    
    # OpenAI
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    
    # Model settings
    LLM_MODEL = "gpt-3.5-turbo"
    EMBEDDING_MODEL = "text-embedding-3-small"
    
    # Chunking settings
    CHUNK_SIZE = 400
    CHUNK_OVERLAP = 50
    
    # Retrieval settings
    RETRIEVER_K = 3
    
    # Paths
    UPLOAD_DIR = "data/uploads"
    CHROMA_PERSIST_DIR = "data/chroma"
    
    def __init__(self):
        # Create directories if they don't exist
        os.makedirs(self.UPLOAD_DIR, exist_ok=True)
        os.makedirs(self.CHROMA_PERSIST_DIR, exist_ok=True)
        
        # Validate API key
        if not self.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY not found in environment variables")

settings = Settings()