import React, { useState } from 'react';
import { Box, Fab, Paper, IconButton, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatInterface } from './ChatInterface';
import { MessageInput } from './MessageInput';
import { publicGlassStyle } from '../../../theme/publicTheme';
import { api } from '../../../services/api';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}`);

  const handleSendMessage = async (text) => {
    const userMessage = { id: Date.now(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const aiMessageId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: aiMessageId, role: 'ai', content: '', sources: [] }]);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      setIsTyping(false); // Hide thinking indicator once stream starts

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.type === 'sources') {
                 setMessages((prev) => prev.map(msg => msg.id === aiMessageId ? { ...msg, sources: parsed.data } : msg));
              } else if (parsed.type === 'token') {
                 setMessages((prev) => prev.map(msg => msg.id === aiMessageId ? { ...msg, content: msg.content + parsed.data } : msg));
              } else if (parsed.type === 'done') {
                break;
              }
            } catch (e) {
              // Ignore partial JSON chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Stream failed:', error);
      setIsTyping(false);
      setMessages((prev) => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, content: "I encounter an error fetching the response..." } 
          : msg
      ));
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ position: 'absolute', bottom: 80, right: 0 }}
          >
            <Paper
              elevation={4}
              sx={{
                ...publicGlassStyle,
                width: { xs: 'calc(100vw - 10px)', sm: 380 },
                height: 500,
                maxHeight: 'calc(100vh - 120px)',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden', // Keep overflow hidden at paper level
                boxShadow: '0 20px 60px rgba(11,118,255,0.15)',
                border: '1px solid rgba(255,255,255,0.4)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <Box sx={{ 
                p: 2.5, 
                bgcolor: 'white',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0 // Prevent header from shrinking
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#16A34A', boxShadow: '0 0 10px #16A34A' }} />
                  <Typography variant="h6" fontWeight="700" fontSize={16} color="primary.main">
                    LuminaTravel Assistant
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'text.secondary', bgcolor: 'rgba(0,0,0,0.03)', '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' } }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              
              {/* ChatInterface container with fixed height and overflow */}
              <Box sx={{ 
                flexGrow: 1,
                height: 0, // Important: forces flex child to respect parent height
                minHeight: 0, // Important for Firefox
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}>
                <ChatInterface messages={messages} isTyping={isTyping} />
              </Box>
              
              <Box sx={{ 
                p: 1, 
                bgcolor: 'background.paper', 
                borderTop: '1px solid rgba(0,0,0,0.05)',
                flexShrink: 0 // Prevent input from shrinking
              }}>
                <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ position: 'absolute', bottom: 0, right: 0 }}
      >
        <Fab 
          color="primary" 
          aria-label="chat"
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            width: 64,
            height: 64,
            boxShadow: '0 8px 32px rgba(56, 189, 248, 0.4)',
            backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #34d399 100%)',
          }}
        >
          {isOpen ? <CloseIcon fontSize="large" sx={{ color: 'white' }} /> : <ChatIcon fontSize="large" sx={{ color: 'white' }} />}
        </Fab>
      </motion.div>
    </Box>
  );
};