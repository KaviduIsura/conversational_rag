export const API_BASE_URL = 'http://127.0.0.1:8000';

export const api = {
  async queryModel(question, sessionId = 'default') {
    const response = await fetch(`${API_BASE_URL}/api/chat/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, session_id: sessionId }),
    });

    if (!response.ok) {
      throw new Error('Failed to query model');
    }

    return response.json();
  },

  async uploadDocuments(files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload document');
    }

    return response.json();
  },

  async getDocuments() {
    const response = await fetch(`${API_BASE_URL}/api/documents`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch documents');
    return response.json();
  },

  async deleteDocument(filename) {
    const response = await fetch(`${API_BASE_URL}/api/documents/${filename}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete document');
    return response.json();
  }
};
