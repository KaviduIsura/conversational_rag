import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Paper, Avatar, CircularProgress, Chip, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { publicGlassStyle } from '../../../theme/publicTheme';

export const ChatInterface = ({ messages, isTyping }) => {
  const theme = useTheme();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [activeSource, setActiveSource] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        flexGrow: 1,
        height: '100%', // Take full height of parent
        overflowY: 'auto', // Enable scrolling
        p: { xs: 2, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
          borderRadius: '3px',
          '&:hover': {
            background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
          }
        }
      }}
    >
      {messages.length === 0 && (
        <Box sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          opacity: 0.8
        }}>
          <Box sx={{ bgcolor: 'rgba(11,118,255,0.1)', p: 2, borderRadius: '50%', mb: 2 }}>
            <SmartToyIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
          <Typography variant="h6" fontWeight="700" fontSize={16} gutterBottom color="text.primary">
            How can I help you?
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ maxWidth: 250, lineHeight: 1.5 }}>
            Ask me anything about your travel plans, destinations, or bookings!
          </Typography>
        </Box>
      )}

      <AnimatePresence initial={false}>
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          return (
            <motion.div
              key={message.id || index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: isUser ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                maxWidth: { xs: '90%', md: '80%' },
                gap: 1.5
              }}>
                <Avatar 
                  sx={{ 
                    bgcolor: isUser ? 'primary.main' : 'secondary.main',
                    width: 36, 
                    height: 36,
                    boxShadow: theme.shadows[2]
                  }}
                >
                  {isUser ? <PersonIcon /> : <SmartToyIcon />}
                </Avatar>
                
                <Box>
                  <Paper 
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      borderBottomRightRadius: isUser ? 4 : 24,
                      borderBottomLeftRadius: isUser ? 24 : 4,
                      ...(!isUser ? publicGlassStyle : {
                         background: theme.palette.mode === 'light' 
                            ? 'linear-gradient(135deg, #1976d2 0%, #0B76FF 100%)'
                            : 'linear-gradient(135deg, #1976d2 0%, #0B76FF 100%)',
                         color: '#ffffff',
                         boxShadow: '0 4px 14px 0 rgba(11,118,255, 0.39)',
                      }),
                    }}
                  >
                    {!isUser ? (
                      <Box className="markdown-body" sx={{ 
                        '& p:first-of-type': { mt: 0 }, 
                        '& p:last-child': { mb: 0 },
                        '& p': { fontSize: 14, lineHeight: 1.5 },
                        color: theme.palette.text.primary 
                      }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </Box>
                    ) : (
                      <Typography variant="body2" fontSize={14}>{message.content}</Typography>
                    )}
                  </Paper>
                  
                  {/* Footer for AI messages (Sources & Actions) */}
                  {!isUser && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, ml: 1 }}>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {message.sources?.map((sourceObj, idx) => {
                           const isString = typeof sourceObj === 'string';
                           const sourceName = isString ? sourceObj : sourceObj.source;
                           
                           return (
                             <Chip 
                               key={idx}
                               icon={<ArticleIcon sx={{ fontSize: '12px !important' }} />}
                               label={`${sourceName} ${!isString && sourceObj.page ? `(p.${sourceObj.page})` : ''}`}
                               size="small" 
                               variant="outlined" 
                               sx={{ fontSize: '0.7rem', height: 20, cursor: !isString ? 'pointer' : 'default' }} 
                               onClick={() => {
                                 if (!isString) setActiveSource(sourceObj);
                               }}
                             />
                           );
                        })}
                      </Box>
                      <Box sx={{ display: 'flex', opacity: 0.6 }}>
                        <Tooltip title="Copy">
                          <IconButton size="small"><ContentCopyIcon fontSize="inherit" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Good response">
                          <IconButton size="small"><ThumbUpOutlinedIcon fontSize="inherit" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Bad response">
                          <IconButton size="small"><ThumbDownOutlinedIcon fontSize="inherit" /></IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </motion.div>
          );
        })}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
              marginBottom: 16
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
                <SmartToyIcon />
              </Avatar>
              <Paper sx={{ ...publicGlassStyle, p: 2, borderRadius: 3, display: 'flex', gap: 1 }}>
                <CircularProgress size={20} color="secondary" />
                <Typography variant="body2" color="text.secondary">Thinking...</Typography>
              </Paper>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={messagesEndRef} />

      {/* Source Citation Modal */}
      <Dialog 
        open={Boolean(activeSource)} 
        onClose={() => setActiveSource(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, ...publicGlassStyle }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)', pb: 1.5 }}>
          <Typography variant="h6" fontWeight="600" fontSize={16}>
            Source Citation
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {activeSource?.source} {activeSource?.page ? `• Page ${activeSource.page}` : ''}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ 
            bgcolor: 'rgba(0,0,0,0.02)', 
            p: 2, 
            borderRadius: 2,
            borderLeft: '4px solid #0B76FF'
          }}>
            <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
              {activeSource?.content || "No detailed content available."}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setActiveSource(null)} variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};