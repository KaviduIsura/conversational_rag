import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Button, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Chip, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
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

  // Modal State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState(null);

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

  const handleDeleteClick = (filename) => {
    setDocToDelete(filename);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!docToDelete) return;
    try {
      await api.deleteDocument(docToDelete);
      setActiveDocs(prev => prev.filter(doc => doc.name !== docToDelete));
    } catch (error) {
      console.error('Failed to delete document', error);
    } finally {
      setDeleteDialogOpen(false);
      setDocToDelete(null);
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setFilesToUpload(Array.from(files));
    setUploadDialogOpen(true);
    // Reset the input so the same file selection triggers onChange again if needed
    event.target.value = '';
  };

  const confirmUpload = async () => {
    if (!filesToUpload || filesToUpload.length === 0) return;
    
    setUploadDialogOpen(false);
    setIsUploading(true);
    try {
      // The backend /api/upload endpoint is currently set up to accept a single file.
      // We will upload them one by one.
      for (let i = 0; i < filesToUpload.length; i++) {
        // We use the api service which has the correct base URL
        // However api.uploadDocuments was built for multiple files, let's just make a raw fetch with the correct base url from api.js if needed or reuse it.
        // Wait, looking at api.uploadDocuments in api.js, it appends 'files' (plural) but backend expects 'file'.
        // To be safe and compliant with the FastAPI backend `file: UploadFile = File(...)`, we do single fetches with the correct base URL.
        const singleFormData = new FormData();
        singleFormData.append('file', filesToUpload[i]);
        
        const response = await fetch(`http://127.0.0.1:8000/api/upload`, {
          method: 'POST',
          body: singleFormData
        });
        
        if (!response.ok) {
           throw new Error(`Failed to upload ${filesToUpload[i].name}`);
        }
      }
      
      await fetchDocuments();
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      setFilesToUpload(null);
    }
  };

  const cancelUpload = () => {
    setUploadDialogOpen(false);
    setFilesToUpload(null);
  };

  return (
    <>
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
            Upload documents to provide context for the AI. Supported formats: PDF, TXT, DOCX, CSV.
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
                    <IconButton size="small" color="error" onClick={() => handleDeleteClick(doc.name)}>
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <b>{docToDelete}</b> from the Knowledge Base? This action will remove it from the AI's context and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit" sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained" sx={{ textTransform: 'none' }}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Upload Confirmation Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={cancelUpload}
      >
        <DialogTitle>Confirm Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to upload and process {filesToUpload?.length} document(s)? This will embed them into the Knowledge Base context immediately.
          </DialogContentText>
          {filesToUpload && filesToUpload.length > 0 && (
            <List dense sx={{ mt: 1, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
              {Array.from(filesToUpload).map((f, i) => (
                <ListItem key={i}><ListItemText primary={f.name} secondary={`${(f.size / 1024).toFixed(1)} KB`} /></ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={cancelUpload} color="inherit" sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button onClick={confirmUpload} color="primary" variant="contained" sx={{ textTransform: 'none' }}>Confirm & Upload</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
