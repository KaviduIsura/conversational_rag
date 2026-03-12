import React, { useState } from 'react';
import { Box, Paper, InputBase, IconButton, Chip, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { publicGlassStyle } from '../../../theme/publicTheme';

export const MessageInput = ({ onSendMessage, disabled }) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');

  const exampleQuestions = [
    "Summarize the main points of this document",
    "What are the key takeaways?",
    "Explain the technical architecture"
  ];

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipClick = (question) => {
    if (!disabled) {
      onSendMessage(question);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { md: 2 } }}>
      {/* Suggestion Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 } }}>
        {exampleQuestions.map((question, idx) => (
          <Chip
            key={idx}
            label={question}
            onClick={() => handleChipClick(question)}
            disabled={disabled}
            variant="outlined"
            size="small"
            sx={{ 
              borderRadius: 4,
              borderColor: 'primary.light',
              color: 'primary.main',
              bgcolor: theme.palette.mode === 'light' ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.1)',
              '&:hover': {
                bgcolor: 'primary.light',
                color: '#fff',
                borderColor: 'primary.main',
              }
            }}
          />
        ))}
      </Box>

      {/* Input Area */}
      <Paper
        elevation={0}
        sx={{
          ...publicGlassStyle,
          p: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: 4,
          border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
          transition: 'all 0.3s ease',
          '&:focus-within': {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
            borderColor: 'primary.main',
          }
        }}
      >
        <Tooltip title="Attach document">
          <IconButton sx={{ p: '10px', color: 'text.secondary' }} disabled={disabled}>
            <AttachFileIcon />
          </IconButton>
        </Tooltip>
        
        <InputBase
          sx={{ ml: 1, flex: 1, py: 1 }}
          placeholder="Ask a question about your documents..."
          inputProps={{ 'aria-label': 'send message' }}
          multiline
          maxRows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={disabled}
        />
        
        <IconButton 
          color="primary" 
          sx={{ 
            p: '10px',
            bgcolor: inputValue.trim() ? `${theme.palette.primary.main}15` : 'transparent',
            transform: inputValue.trim() ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.2s ease',
          }} 
          onClick={handleSend}
          disabled={disabled || !inputValue.trim()}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};
