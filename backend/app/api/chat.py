from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from app.models.schemas import ChatRequest, ChatResponse, SessionClearResponse
from app.services.rag_service import rag_service

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Standard block chat with RAG.
    """
    try:
        result = rag_service.query(
            question=request.message,
            session_id=request.session_id
        )
        return ChatResponse(
            answer=result["answer"],
            session_id=request.session_id,
            sources=result["sources"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Stream chat with the RAG system via Server-Sent Events (SSE).
    """
    try:
        return StreamingResponse(
            rag_service.stream_query(request.message, request.session_id),
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat/clear/{session_id}", response_model=SessionClearResponse)
async def clear_chat_history(session_id: str):
    """
    Clear chat history for a session
    """
    try:
        rag_service.clear_session(session_id)
        return SessionClearResponse(
            message="Chat history cleared",
            session_id=session_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))