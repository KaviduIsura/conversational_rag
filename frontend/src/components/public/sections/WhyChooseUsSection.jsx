import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';

const iconBounce = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.6, duration: 0.8 } },
  hover: { y: -8, scale: 1.1, transition: { type: 'spring', bounce: 0.5 } }
};

export const WhyChooseUsSection = () => {
  const features = [
    { title: 'Best Price Guarantee', icon: <ThumbUpAltIcon fontSize="inherit" />, desc: 'We promise the most competitive rates for luxury travel experiences without hidden fees.', color: '#0B76FF' },
    { title: '24/7 Customer Support', icon: <SupportAgentIcon fontSize="inherit" />, desc: 'Our dedicated team is available around the clock to assist you anywhere in the world.', color: '#FF8A00' },
    { title: 'Handpicked Destinations', icon: <StarIcon fontSize="inherit" />, desc: 'Every location and property is rigorously vetted by our travel experts.', color: '#E91E63' },
    { title: 'Secure Booking', icon: <SecurityIcon fontSize="inherit" />, desc: 'State-of-the-art encryption ensures your payments and personal data are always safe.', color: '#16A34A' },
  ];

  return (
    <Box id="about" sx={{ bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 8 }}>
          We transform ordinary trips into extraordinary memories with unparalleled service and expertise.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center',alignItems:'', maxWidth: 1000, mx: 'auto' }}>
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center', 
                p: 3, 
                width: 260, 
                height: 280,
                bgcolor: 'background.paper',
                borderRadius: 4,
                boxShadow: '0 4px 15px rgba(18,50,67,0.02)',
                border: '1px solid rgba(18,50,67,0.03)'
              }}>
                <motion.div variants={iconBounce} initial="hidden" whileInView="show" whileHover="hover" viewport={{ once: true }}>
                  <Box sx={{ 
                    display: 'inline-flex', 
                    p: 2, 
                    borderRadius: '50%', 
                    bgcolor: `${feature.color}15`, 
                    color: feature.color, 
                    fontSize: 32,
                    mb: 2
                  }}>
                    {feature.icon}
                  </Box>
                </motion.div>
                <Typography variant="h4" gutterBottom fontSize={16} fontWeight={700}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={13}>
                  {feature.desc}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
