from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory

# Store for session histories (in-memory - for production use Redis or database)
session_store = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    """Get or create a chat message history for a session"""
    if session_id not in session_store:
        session_store[session_id] = ChatMessageHistory()
    return session_store[session_id]

def clear_session(session_id: str):
    """Clear session history"""
    if session_id in session_store:
        del session_store[session_id]