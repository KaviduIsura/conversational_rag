from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class ChatRequest(BaseModel):
    """Chat request schema"""
    message: str = Field(..., description="User message")
    session_id: str = Field("default", description="Session ID for conversation history")

class ChatResponse(BaseModel):
    """Chat response schema"""
    answer: str = Field(..., description="AI response")
    session_id: str = Field(..., description="Session ID")
    sources: Optional[List[Dict[str, Any]]] = Field(default=None, description="Source documents used")
    
class UploadResponse(BaseModel):
    """Upload response schema"""
    message: str
    filename: str
    chunks: int
    session_id: Optional[str] = None

class SessionClearResponse(BaseModel):
    """Session clear response schema"""
    message: str
    session_id: str