import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button, Rating, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const fadeUpItem = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const ToursSection = () => {
  const tours = [
    {
      title: '7 Days Bali Escape',
      duration: '7 Days',
      price: '$899',
      rating: 4.8,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: '14 Days Europe Explorer',
      duration: '14 Days',
      price: '$2,450',
      rating: 4.9,
      reviews: 310,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: '5 Days Maldives Relaxation',
      duration: '5 Days',
      price: '$1,850',
      rating: 5.0,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <Box id="tours" sx={{ bgcolor: '#FBFDFF', py: 12 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 8, flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
          <Box>
            <Typography variant="h2" color="text.primary" gutterBottom>
              Featured Packages
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
              Curated itineraries combining flights, stays, and experiences for a seamless journey.
            </Typography>
          </Box>
          <Button variant="outlined" color="primary">
            View All Packages
          </Button>
        </Box>

        <Grid container spacing={4}>
          {tours.map((tour, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div 
                variants={fadeUpItem} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card sx={{ 
                  borderRadius: 3, 
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(18,50,67,0.06)',
                  border: '1px solid rgba(18,50,67,0.05)',
                  transition: 'box-shadow 0.3s',
                  '&:hover': { boxShadow: '0 12px 40px rgba(11,118,255,0.1)' }
                }}>
                  <CardMedia component="img" height="240" image={tour.image} alt={tour.title} />
                  <CardContent sx={{ p: 4, bgcolor: 'background.paper' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
                       <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                       <Typography variant="body2" fontWeight={600}>{tour.duration}</Typography>
                    </Box>
                    <Typography variant="h3" gutterBottom fontSize={22}>
                      {tour.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Rating value={tour.rating} precision={0.1} readOnly size="small" sx={{ color: 'secondary.main', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">({tour.reviews} reviews)</Typography>
                    </Box>
                    <Divider sx={{ mb: 3, borderColor: 'rgba(0,0,0,0.05)' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Starting from</Typography>
                        <Typography variant="h3" color="primary.main">{tour.price}</Typography>
                      </Box>
                      <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
                        Book Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
