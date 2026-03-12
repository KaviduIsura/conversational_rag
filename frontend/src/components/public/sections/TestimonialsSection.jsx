import React from 'react';
import { Box, Typography, Container, Avatar, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export const TestimonialsSection = () => {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      rating: 5,
      text: 'Amazing travel experience! Everything was perfectly organized from the flights down to the private dinners on the beach.'
    },
    {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      rating: 5,
      text: 'The cultural tour of Japan exceeded all expectations. The guides were deeply knowledgeable and very accommodating.'
    },
    {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      rating: 4.5,
      text: 'We booked our honeymoom through LuminaTravel. The absolute best decision we ever made. Flawless execution.'
    },
    {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      rating: 5,
      text: 'A life-changing trek through the Alps. Breathtaking views and top-tier lodges were arranged for us every night.'
    }
  ];

  return (
    <Box id="reviews" sx={{ bgcolor: 'background.paper', py: 12, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          What Our Travelers Say
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 8 }}>
          Don't just take our word for it—read stories from our global community of adventurers.
        </Typography>

        {/* Pseudo-carousel using CSS Scroll Snap */}
        <Box sx={{
          display: 'flex',
          gap: 4,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          pb: 4,
          px: 2,
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'primary.light', borderRadius: 4 },
        }}>
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              style={{ flex: '0 0 auto', scrollSnapAlign: 'center' }}
            >
              <Box sx={{
                width: { xs: 280, md: 350 },
                p: 4,
                bgcolor: 'background.default',
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(18,50,67,0.05)',
                border: '1px solid rgba(18,50,67,0.03)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <FormatQuoteIcon sx={{ fontSize: 40, color: 'primary.light', opacity: 0.3, mb: 2 }} />
                <Typography variant="body1" sx={{ fontStyle: 'italic', flexGrow: 1, mb: 3 }}>
                  "{rev.text}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                  <Avatar src={rev.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" fontSize={16}>{rev.name}</Typography>
                    <Rating value={rev.rating} precision={0.5} readOnly size="small" sx={{ color: 'secondary.main' }} />
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
