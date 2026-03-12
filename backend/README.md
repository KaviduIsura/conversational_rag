# Conversational RAG Backend

This is a FastAPI-based backend for the Conversational RAG application.

## Prerequisites

- Python 3.8+ (ensure `python` or `python3` is available in your PATH)
- Virtual Environment tool (`venv`)

## Setup Instructions

1. **Navigate to the backend directory** (if you aren't already there):
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv env
   ```

3. **Activate the virtual environment**:
   - On Mac/Linux:
     ```bash
     source env/bin/activate
     ```

4. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up Environment Variables**:
   There is an existing `.env` file or you might need to supply your own variables (like `OPENAI_API_KEY`). Check the `.env` file to ensure the necessary keys are present.

## Running the Application

Once the dependencies are installed and the virtual environment is activated, you can start the FastAPI server:

```bash
python run.py
```

The server will start on `http://127.0.0.1:8000`. It may have Swagger documentation available at `http://127.0.0.1:8000/docs`.
