from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
from app.models.schemas import UploadResponse
from app.services.document_processor import DocumentProcessor
from app.services.rag_service import rag_service
from app.core.config import settings

router = APIRouter()
doc_processor = DocumentProcessor()

@router.post("/upload", response_model=UploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    session_id: str = "default"
):
    """
    Upload and index a document
    - **file**: Document file (PDF, CSV, JSON, HTML, DOCX)
    - **session_id**: Optional session ID for document association
    """
    try:
        # Save uploaded file
        file_path = os.path.join(settings.UPLOAD_DIR, file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Load and process document
        documents = doc_processor.load_document(file_path)
        chunks = doc_processor.split_documents(documents)
        
        # Add to vector store
        rag_service.add_documents(chunks)
        
        # Clean up uploaded file (optional)
        # os.remove(file_path)
        
        return UploadResponse(
            message="Document uploaded and indexed successfully",
            filename=file.filename,
            chunks=len(chunks),
            session_id=session_id
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/documents")
async def list_documents():
    """
    List all uploaded documents
    """
    try:
        docs = rag_service.get_documents()
        return {"documents": docs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/documents/{filename}")
async def delete_document(filename: str):
    """
    Remove a document from the vector store
    """
    try:
        success = rag_service.delete_document(filename)
        if success:
            # Optionally remove the physical file if it exists
            file_path = os.path.join(settings.UPLOAD_DIR, filename)
            if os.path.exists(file_path):
                os.remove(file_path)
            return {"message": f"Document {filename} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Document not found in vector store")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))