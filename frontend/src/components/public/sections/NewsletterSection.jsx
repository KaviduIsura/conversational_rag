import React from 'react';
import { Box, Typography, Container, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';

export const NewsletterSection = () => {
  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ 
            background: 'linear-gradient(135deg, #0B76FF 0%, #16A34A 100%)',
            borderRadius: 4,
            py: { xs: 6, md: 8 },
            px: { xs: 3, md: 6 },
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 20px 40px rgba(11,118,255,0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Decorator */}
            <Box sx={{ 
              position: 'absolute', 
              top: '-50%', 
              right: '-10%', 
              width: 400, 
              height: 400, 
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
              borderRadius: '50%'
            }} />

            <Typography variant="h2" color="white" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
              Get Travel Deals & Tips
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 500, mx: 'auto', position: 'relative', zIndex: 1 }}>
              Subscribe to our newsletter to receive curated itineraries, hidden gems, and exclusive discounts directly in your inbox.
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'center', 
              gap: 2, 
              maxWidth: 500, 
              mx: 'auto',
              position: 'relative',
              zIndex: 1
            }}>
              <TextField 
                placeholder="Enter your email address"
                variant="outlined"
                fullWidth
                sx={{ 
                  bgcolor: 'white', 
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  input: { py: 1.5, px: 2 }
                }}
              />
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                endIcon={<SendIcon />}
                sx={{ px: 4, flexShrink: 0, height: 48 }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
