import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

export const GallerySection = () => {
  const images = [
    { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', alt: 'Beaches', delay: 0 },
    { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', alt: 'Mountains', delay: 0.1 },
    { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800', alt: 'Culture', delay: 0.2 },
    { src: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800', alt: 'Cities', delay: 0.3 },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', alt: 'Food', delay: 0.4 },
    { src: 'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?auto=format&fit=crop&q=80&w=800', alt: 'Lifestyle', delay: 0.5 },
  ];

  return (
    <Box id="gallery" sx={{ bgcolor: '#FBFDFF', py: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          Wanderlust Gallery
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 8 }}>
          Immerse yourself in breathtaking visuals from our favorite destinations around the globe.
        </Typography>

        {/* CSS Masonry Layout */}
        <Box sx={{
          columnCount: { xs: 1, sm: 2, md: 3 },
          columnGap: '20px',
          width: '100%',
        }}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: img.delay, duration: 0.6, ease: 'easeOut' }}
              style={{ display: 'inline-block', width: '100%', marginBottom: '20px', breakInside: 'avoid' }}
            >
              <Box sx={{ 
                position: 'relative', 
                borderRadius: 4, 
                overflow: 'hidden', 
                cursor: 'pointer',
                '&:hover img': { transform: 'scale(1.08)' },
                '&:hover .overlay': { opacity: 1 }
              }}>
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    display: 'block', 
                    transition: 'transform 0.5s ease' 
                  }} 
                />
                <Box className="overlay" sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(18,50,67,0.4)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="h4" color="white" sx={{ fontWeight: 600, letterSpacing: '1px' }}>
                    {img.alt}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
