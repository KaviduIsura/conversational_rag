import os
from typing import List, Optional
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.documents import Document
from langchain_core.runnables.history import RunnableWithMessageHistory
from app.core.config import settings
from app.core.session import get_session_history

class RAGService:
    """Conversational RAG Service"""
    
    def __init__(self):
        # Initialize LLM
        self.llm = ChatOpenAI(
            model=settings.LLM_MODEL,
            temperature=0,
            openai_api_key=settings.OPENAI_API_KEY
        )
        
        # Initialize embeddings
        self.embeddings = OpenAIEmbeddings(
            model=settings.EMBEDDING_MODEL,
            openai_api_key=settings.OPENAI_API_KEY
        )
        
        # Initialize or load vector store
        self.vectorstore = Chroma(
            persist_directory=settings.CHROMA_PERSIST_DIR,
            embedding_function=self.embeddings
        )
        
        # Create prompts
        self._create_prompts()
        
        # Initialize retriever and chains
        self._setup_retriever_and_chains()
    
    def _setup_retriever_and_chains(self):
        """Set up the Ensemble Retriever and re-bind chains."""
        from langchain.retrievers import EnsembleRetriever
        from langchain_community.retrievers import BM25Retriever
        
        vector_retriever = self.vectorstore.as_retriever(
            search_kwargs={"k": settings.RETRIEVER_K}
        )
        
        # Build BM25 from existing data if available
        results = self.vectorstore.get(include=["documents", "metadatas"])
        if results and results.get("documents") and len(results["documents"]) > 0:
            documents = [
                Document(page_content=doc, metadata=meta or {})
                for doc, meta in zip(results["documents"], results["metadatas"])
            ]
            bm25_retriever = BM25Retriever.from_documents(documents)
            bm25_retriever.k = settings.RETRIEVER_K
            
            self.retriever = EnsembleRetriever(
                retrievers=[bm25_retriever, vector_retriever],
                weights=[0.3, 0.7]
            )
        else:
            self.retriever = vector_retriever
            
        self._create_chains()
    
    def _create_prompts(self):
        """Create prompt templates"""
        
        # Contextualize prompt for history-aware retriever
        contextualize_system_prompt = (
            "Given a chat history and the latest user question "
            "which might reference context in the chat history, "
            "formulate a standalone question which can be understood "
            "without the chat history. Do NOT answer the question, "
            "just reformulate it if needed and otherwise return it as is."
        )
        
        self.contextualize_prompt = ChatPromptTemplate.from_messages([
            ("system", contextualize_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}")
        ])
        
        # QA system prompt
        qa_system_prompt = (
            "You are an intelligent chatbot. "
            "Use the following context to answer the question. "
            "If you don't know the answer, just say that you don't know. "
            "Keep the answer concise but informative.\n\n"
            "{context}"
        )
        
        self.qa_prompt = ChatPromptTemplate.from_messages([
            ("system", qa_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}")
        ])
    
    def _create_chains(self):
        """Create the RAG chains"""
        
        # Create history-aware retriever
        self.history_aware_retriever = create_history_aware_retriever(
            self.llm, 
            self.retriever, 
            self.contextualize_prompt
        )
        
        # Create question-answering chain
        question_answer_chain = create_stuff_documents_chain(
            self.llm, 
            self.qa_prompt
        )
        
        # Create RAG chain
        self.rag_chain = create_retrieval_chain(
            self.history_aware_retriever, 
            question_answer_chain
        )
        
        # Create conversational RAG chain with history
        self.conversational_rag_chain = RunnableWithMessageHistory(
            self.rag_chain,
            get_session_history,
            input_messages_key="input",
            history_messages_key="chat_history",
            output_messages_key="answer"
        )
    
    def add_documents(self, documents: List[Document]):
        """Add documents to vector store"""
        self.vectorstore.add_documents(documents)
        # Update hybrid search since documents changed
        self._setup_retriever_and_chains()
    
    def query(self, question: str, session_id: str = "default") -> dict:
        """Query the RAG system with conversation history"""
        response = self.conversational_rag_chain.invoke(
            {"input": question},
            config={"configurable": {"session_id": session_id}}
        )
        
        # Extract sources from the retrieved context
        docs = response.get("context", [])
        sources = [
            {
                "source": doc.metadata.get("source", "Unknown"), 
                "page": doc.metadata.get("page", ""), 
                "content": doc.page_content
            }
            for doc in docs
        ]
        
        return {
            "answer": response["answer"],
            "sources": sources
        }

    async def stream_query(self, question: str, session_id: str = "default"):
        """Stream the RAG system response with conversation history"""
        import json
        
        async for chunk in self.conversational_rag_chain.astream(
            {"input": question},
            config={"configurable": {"session_id": session_id}}
        ):
            if "context" in chunk:
                docs = chunk["context"]
                sources = [
                    {
                        "source": doc.metadata.get("source", "Unknown"), 
                        "page": doc.metadata.get("page", ""), 
                        "content": doc.page_content
                    }
                    for doc in docs
                ]
                yield f"data: {json.dumps({'type': 'sources', 'data': sources})}\n\n"
            
            if "answer" in chunk:
                yield f"data: {json.dumps({'type': 'token', 'data': chunk['answer']})}\n\n"
                
        yield f"data: {json.dumps({'type': 'done'})}\n\n"
    
    def clear_session(self, session_id: str):
        """Clear session history"""
        from app.core.session import clear_session
        clear_session(session_id)

    def get_documents(self) -> list:
        """List all unique document sources in the vector store."""
        import os
        # Chroma get returns a dict with 'ids', 'metadatas', 'documents', etc.
        results = self.vectorstore.get(include=["metadatas"])
        docs = set()
        for meta in results.get("metadatas", []):
            if meta and "source" in meta:
                docs.add(os.path.basename(meta["source"]))
        return list(docs)

    def delete_document(self, source_name: str) -> bool:
        """Delete all chunks belonging to a specific document source."""
        import os
        results = self.vectorstore.get(include=["metadatas"])
        ids_to_delete = []
        for doc_id, meta in zip(results.get("ids", []), results.get("metadatas", [])):
            if meta and "source" in meta:
                if os.path.basename(meta["source"]) == source_name:
                    ids_to_delete.append(doc_id)
                    
        if ids_to_delete:
            self.vectorstore.delete(ids=ids_to_delete)
            self._setup_retriever_and_chains()
            return True
        return False

# Singleton instance
rag_service = RAGService()