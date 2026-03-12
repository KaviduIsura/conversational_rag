import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Button, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Chip,Tooltip,IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { api } from '../../services/api';

export const KnowledgeBase = ({ onUploadSuccess }) => {
  const theme = useTheme();
  
  const [isUploading, setIsUploading] = useState(false);
  const [activeDocs, setActiveDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const data = await api.getDocuments();
      if (data && data.documents) {
        setActiveDocs(data.documents.map((name, idx) => ({ id: idx, name, status: 'ready' })));
      }
    } catch (error) {
      console.error('Failed to fetch documents', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (filename) => {
    try {
      await api.deleteDocument(filename);
      // Optimistically remove from state
      setActiveDocs(prev => prev.filter(doc => doc.name !== filename));
    } catch (error) {
      console.error('Failed to delete document', error);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      // Create FormData properly
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]); // Wait, backend expects 'file', not 'files' or array
      }
      
      // Let's use the explicit single file or wait, api.js uploadDocuments uses 'files' array looping.
      // Backend expects `file: UploadFile = File(...)` which means 'file' for single upload.
      // Let's just pass the first file for now or hit the API multiple times if multiple supported.
      // Wait, let's just do a manual single loop or use the api if it supports loops.
      // We will upload them one by one.
      for (let i = 0; i < files.length; i++) {
        const singleFormData = new FormData();
        singleFormData.append('file', files[i]);
        await fetch(`http://127.0.0.1:8000/api/upload`, {
          method: 'POST',
          body: singleFormData
        });
      }
      
      await fetchDocuments();
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography variant="h6" fontWeight="600" color="primary.main" gutterBottom>
          Knowledge Base
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Upload documents to provide context for the AI. Supported formats: PDF, TXT, DOCX.
        </Typography>

        <Button
          component="label"
          variant="contained"
          color="primary"
          startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
          fullWidth
          disabled={isUploading}
          sx={{ 
            py: 1.5, 
            borderRadius: 2,
            backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
            '&:hover': {
              backgroundImage: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
            }
          }}
        >
          {isUploading ? 'Uploading...' : 'Upload Documents'}
          <input
            type="file"
            multiple
            hidden
            onChange={handleFileUpload}
            accept=".pdf,.txt,.docx,.csv"
          />
        </Button>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />

      <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" fontWeight="600">
            Active Context
          </Typography>
          <Chip size="small" label={`${activeDocs.length} files`} color="secondary" variant="outlined" />
        </Box>

        <List disablePadding>
          {activeDocs.map((doc) => (
            <ListItem 
              key={doc.id}
              disablePadding
              sx={{ 
                mb: 1, 
                p: 1.5, 
                borderRadius: 2, 
                bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <InsertDriveFileIcon color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={doc.name} 
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500, noWrap: true }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Processed">
                   <CheckCircleOutlineIcon color="success" sx={{ fontSize: 16 }} />
                </Tooltip>
                <Tooltip title="Delete Document">
                  <IconButton size="small" color="error" onClick={() => handleDelete(doc.name)}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          ))}
          {activeDocs.length === 0 && !isLoading && (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4, fontStyle: 'italic' }}>
              No documents added to context yet.
            </Typography>
          )}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress size={24} />
            </Box>
          )}
        </List>
      </Box>
    </Paper>
  );
};
