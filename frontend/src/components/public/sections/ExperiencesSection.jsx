import React from 'react';
import { Box, Typography, Container, Grid, CardActionArea } from '@mui/material';
import { motion } from 'framer-motion';

// Icons
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DiamondIcon from '@mui/icons-material/Diamond';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ForestIcon from '@mui/icons-material/Forest';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const popUpItem = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200 } }
};

export const ExperiencesSection = () => {
  const experiences = [
    { title: 'Adventure Travel', icon: <DirectionsRunIcon fontSize="large" />, color: '#FF8A00' },
    { title: 'Luxury Travel', icon: <DiamondIcon fontSize="large" />, color: '#0B76FF' },
    { title: 'Beach Holidays', icon: <BeachAccessIcon fontSize="large" />, color: '#00BFA5' },
    { title: 'Cultural Tours', icon: <AccountBalanceIcon fontSize="large" />, color: '#E91E63' },
    { title: 'Food Tours', icon: <RestaurantIcon fontSize="large" />, color: '#FFB300' },
    { title: 'Nature & Wildlife', icon: <ForestIcon fontSize="large" />, color: '#4CAF50' },
  ];

  return (
    <Box id="experiences" sx={{ bgcolor: 'background.paper', py: 12 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" color="text.primary" gutterBottom>
            Travel Experiences
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Choose your ideal travel style. Whether you are seeking adrenaline, relaxation, or cultural immersion.
          </Typography>
        </Box>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
          <Grid container spacing={3} justifyContent="center">
            {experiences.map((exp, i) => (
              <Grid item xs={6} sm={4} md={2} key={i}>
                <motion.div variants={popUpItem} whileHover={{ scale: 1.05 }}>
                  <CardActionArea sx={{ borderRadius: 3, transition: 'all 0.3s' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      p: 4, 
                      bgcolor: 'background.default',
                      borderRadius: 3,
                      border: '1px solid rgba(0,0,0,0.03)',
                      height: 180,
                      gap: 2,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: `0 8px 30px ${exp.color}33`, // 33 is approx 20% opacity hex
                        borderColor: `${exp.color}55`
                      }
                    }}>
                      <Box sx={{ color: exp.color, mb: 1 }}>
                        {exp.icon}
                      </Box>
                      <Typography variant="h4" align="center" fontSize={16}>
                        {exp.title}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};
