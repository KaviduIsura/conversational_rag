from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat, upload
from app.core.config import settings

# Create FastAPI app
app = FastAPI(
    title="Conversational RAG API",
    description="API for Conversational RAG with LangChain and OpenAI",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(upload.router, prefix="/api", tags=["upload"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Conversational RAG API",
        "version": "1.0.0",
        "docs": "/docs",
        "settings": {
            "llm_model": settings.LLM_MODEL,
            "embedding_model": settings.EMBEDDING_MODEL,
            "chunk_size": settings.CHUNK_SIZE,
            "chunk_overlap": settings.CHUNK_OVERLAP
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}