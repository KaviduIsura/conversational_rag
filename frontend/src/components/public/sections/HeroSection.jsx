import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { publicGlassStyle } from '../../../theme/publicTheme';

const cloudAnimation = {
  x: [0, 50, 0],
  y: [0, -10, 0],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear'
  }
};

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <Box id="hero" sx={{ position: 'relative', height: '100vh', minHeight: 700, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Background with Zoom Effect */}
      <motion.div style={{ scale: scaleImage, y: y1, position: 'absolute', top: 0, left: 0, right: 0, bottom: -100, zIndex: -1 }}>
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          backgroundImage: 'url("https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=2000")', // Beautiful expansive landscape
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
           {/* Gradient Overlay for Text Readability */}
           <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(18, 50, 67, 0.7) 0%, rgba(18, 50, 67, 0.2) 100%)' }} />
        </Box>
      </motion.div>

      {/* Floating Clouds Elements (Decorations) */}
      {/* <motion.div animate={cloudAnimation} style={{ position: 'absolute', top: '20%', right: '10%', opacity: 0.4, zIndex: 0 }}>
         <img src="https://cdn.pixabay.com/photo/2012/04/18/13/21/clouds-37009_1280.png" width="300" alt="cloud" />
      </motion.div> */}
      {/* <motion.div animate={{ ...cloudAnimation, transition: { duration: 25, repeat: Infinity, ease: 'linear' } }} style={{ position: 'absolute', top: '40%', left: '5%', opacity: 0.3, zIndex: 0 }}>
         <img src="https://cdn.pixabay.com/photo/2012/04/18/13/21/clouds-37009_1280.png" width="450" alt="cloud" />
      </motion.div> */}

      {/* Hero Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 10 }}>
        <Grid container>
          <Grid item xs={12} md={9} lg={8}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Typography variant="h1" color="white" gutterBottom sx={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                Discover Your Next Adventure
              </Typography>
              <Typography variant="h3" sx={{ color: 'rgba(255,255,255,0.95)', mb: 5, fontWeight: 400, maxWidth: 650, textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                Explore the world's most beautiful destinations with curated travel experiences.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
                <Button variant="contained" color="primary" size="large">
                  Explore Destinations
                </Button>
                <Button variant="contained" color="secondary" size="large">
                  Plan Your Trip
                </Button>
              </Box>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Search Widget */}
              <Box sx={{ 
                ...publicGlassStyle, 
                background: 'rgba(255, 255, 255, 0.95)',
                p: { xs: 2, sm: 3 }, 
                borderRadius: 4, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: 'center',
                boxShadow: '0 10px 40px rgba(11, 118, 255, 0.15)'
              }}>
                <TextField 
                  placeholder="Where to?"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: <PlaceOutlinedIcon color="primary" sx={{ mr: 1 }} />
                  }}
                  sx={{ bgcolor: 'white', '& fieldset': { border: 'none' }, borderRadius: 2 }}
                />
                <TextField 
                  placeholder="Dates"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: <CalendarTodayOutlinedIcon color="primary" sx={{ mr: 1 }} />
                  }}
                  sx={{ bgcolor: 'white', '& fieldset': { border: 'none' }, borderRadius: 2 }}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  sx={{ height: 56, px: 4, width: { xs: '100%', sm: 'auto' }, flexShrink: 0 }}
                >
                  Search
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
