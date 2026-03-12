# Conversational RAG & Travel Booking Platform
**Comprehensive Project Documentation**

---

## 1. Executive Summary
This project is a modern, full-stack web application designed for a premium travel agency. It seamlessly blends a highly-animated, high-conversion landing page with an intelligent **Retrieval-Augmented Generation (RAG) AI Chatbot**. Furthermore, it features a secure Admin Panel for managing bookings, tracking analytics, and directly managing the AI's internal knowledge base (Vector Store).

---

## 2. Technology Stack

### Frontend (User Interface)
- **Framework**: React 18, Vite
- **Styling & UI Components**: Material UI (MUI) v5, Emotion (CSS-in-JS)
- **Animations**: Framer Motion (Scroll animations, micro-interactions)
- **Data Visualization**: Recharts (Responsive SVG Charts)
- **Routing**: React Router DOM (Admin routing)
- **Icons**: MUI Icons Material

### Backend (Server & API)
- **Framework**: FastAPI (High-performance Python API framework)
- **Server**: Uvicorn (ASGI server)
- **Concurrency**: Python `asyncio`

### AI, Machine Learning & Database
- **Orchestration**: LangChain (Chains, Prompts, Agents)
- **Large Language Models**: OpenAI (GPT-3.5/4)
- **Embeddings**: OpenAI Embeddings (`text-embedding-3-small` / `ada-002`)
- **Vector Database**: ChromaDB (Persistent local storage)
- **Search Optimization**: Hybrid Search via `rank_bm25` (BM25 Keyword + Semantic Vector)
- **Document Processing**: PyPDF2, docx2txt, beautifulsoup4, python-multipart

---

## 3. System Architecture & Workflows

### 3.1 Public Landing Page Workflow
1. The user visits the root `/` URL and is served the `Home.jsx` monolithic page.
2. 12 dedicated semantic sections (Hero, Destinations, Experiences, Testimonials, etc.) render sequentially.
3. Framer Motion triggers hardware-accelerated scroll animations as the user navigates down the page.

### 3.2 Advanced RAG Chatbot Workflow (Real-Time SSE)
1. The user clicks the floating Chat Widget and types a natural language query.
2. The frontend sends a POST request using the native Fetch API to the backend `/api/chat/stream` endpoint.
3. **Backend Processing** (`rag_service.py`):
    - LangChain formulates a standalone question based on session history.
    - The `EnsembleRetriever` runs a **Hybrid Search** (30% exact keywords, 70% semantic meaning) against ChromaDB.
    - Context (Document chunks) is extracted and passed to the LLM.
4. **Streaming Response**: The LLM uses `astream()` to yield data. Fast API streams this back via Server-Sent Events (SSE).
5. The frontend reactively renders the tokens and attaches clickable **Source Chips** linked to the exact paragraph the AI used.

### 3.3 Admin Knowledge Base Workflow
1. The admin visits `/admin/knowledge` to manage the AI's memory.
2. `api.getDocuments()` queries ChromaDB metadata to list all active embedded context.
3. **Uploads**: The admin uploads PDFs or TXTs. The backend chunks that text and embeds it into the DB. The hybrid search is instantly rebuilt.
4. **Deletions**: The admin clicks "Delete", wiping specific source chunks from ChromaDB and dynamically rebuilding the search index.

---

## 4. Codebase Metrics
The application utilizes modern architecture to keep the codebase highly maintainable. Across the entire application stack, there are approximately **~3,700 lines of proprietary code** (excluding dependencies and environments).

- **Frontend Lines of Code**: ~2,600 (JSX, CSS, JS over ~35 files)
- **Backend Lines of Code**: ~1,100 (Python files over ~10 modules)

### Key Files by Density
- `Home.jsx` (Core Landing Page Orchestrator)
- `rag_service.py` (~220 lines - RAG Brain & Hybrid Search)
- `ChatInterface.jsx` (~247 lines - Chat Rendering & Animations)
- `KnowledgeBase.jsx` (~185 lines - Admin File Management & Modals)
- `upload.py` & `chat.py` (FastAPI Core Routers)

---

## 5. Development Workflows & Scripts

### Starting the System
To run the full stack locally:

**1. Start the Backend**
```bash
cd backend
source env/bin/activate
python run.py
```
*(Runs on http://127.0.0.1:8000)*

**2. Start the Frontend**
```bash
cd frontend
npm run dev
```
*(Runs on exactly tuned Vite development port)*

### Environment Variables Required
The backend relies on an `.env` file containing:
- `OPENAI_API_KEY`: Required for Embeddings and LLM Generation.
- `CHROMA_PERSIST_DIR`: Usually `./chroma_db`
- `UPLOAD_DIR`: Usually `./storage`
