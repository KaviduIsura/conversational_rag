import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export const DestinationsSection = () => {
  const destinations = [
    { 
      title: 'Bali, Indonesia', 
      desc: 'Lush landscapes and spiritual retreats.',
      price: 'From $850', 
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      title: 'Switzerland', 
      desc: 'Snow-capped peaks and pristine lakes.',
      price: 'From $2,100', 
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      title: 'Kyoto, Japan', 
      desc: 'Ancient temples and modern culture.',
      price: 'From $1,800', 
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      title: 'Maldives', 
      desc: 'Overwater bungalows and crystal waters.',
      price: 'From $3,400', 
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      title: 'Amalfi Coast, Italy', 
      desc: 'Dramatic cliffs and stunning coastline.',
      price: 'From $1,600', 
      image: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      title: 'Santorini, Greece', 
      desc: 'Iconic sunsets and whitewashed houses.',
      price: 'From $1,400', 
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800' 
    }
  ];

  return (
    <Box id="destinations" sx={{ bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="lg">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" color="text.primary" gutterBottom>
               Destination Highlights
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
               Explore the world's most sought-after locations. From pristine beaches to historic cityscapes, find the perfect backdrop for your next story.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {destinations.map((dest, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div 
                  variants={fadeUpItem} 
                  whileHover="hover"
                >
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 12px 30px rgba(11,118,255,0.1)'
                    }
                  }}>
                    <Box sx={{ overflow: 'hidden', position: 'relative', paddingTop: '75%' /* 4:3 Aspect Ratio */ }}>
                       <motion.div
                          variants={{
                            hover: { scale: 1.05 }
                          }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                       >
                         <CardMedia 
                            component="img" 
                            image={dest.image} 
                            alt={dest.title} 
                            sx={{ width: '100%', height: '100%' }}
                         />
                         {/* Image overlay animation on hover */}
                         <motion.div
                           variants={{
                             hover: { opacity: 1 }
                           }}
                           initial={{ opacity: 0 }}
                           transition={{ duration: 0.3 }}
                           style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,50,67,0.8) 0%, rgba(0,0,0,0) 60%)' }}
                         />
                       </motion.div>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3, bgcolor: 'background.paper' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h4" color="text.primary">
                          {dest.title}
                        </Typography>
                        <Chip label={dest.price} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600, border: 'none', bgcolor: 'rgba(11,118,255,0.1)' }} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {dest.desc}
                      </Typography>
                      
                      <Button variant="outlined" color="primary" fullWidth sx={{ borderRadius: 2 }}>
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Button variant="contained" color="secondary" size="large">
              View All Destinations
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
