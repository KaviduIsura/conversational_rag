import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const BlogSection = () => {
  const posts = [
    {
      title: 'Top 10 Places to Visit in 2026',
      preview: 'Get ahead of the crowds and discover the emerging destinations that are set to define travel this year.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
      category: 'Guides'
    },
    {
      title: 'Best Budget Travel Tips',
      preview: 'Learn how to stretch your travel budget without compromising on the quality of your experiences.',
      image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800',
      category: 'Tips'
    },
    {
      title: 'Hidden Gems in Europe',
      preview: 'Skip the major capitals and explore these breathtaking European towns that most tourists miss.',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
      category: 'Inspiration'
    },
    {
      title: 'Ultimate Packing List',
      preview: 'Everything you need to know about packing light and smart for long-term international travel.',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800',
      category: 'Tips'
    }
  ];

  return (
    <Box id="blog" sx={{ bgcolor: 'background.default', py: 12 }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom>
          Travel Journal
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 8 }}>
          Travel tips, destination guides, and stories to inspire your next adventure.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', maxWidth: 1000, mx: 'auto' }}>
          {posts.map((post, i) => (
            <motion.div 
              key={i}
              variants={fadeUpItem} 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -8 }}
              style={{ width: 340 }}
            >
              <Card sx={{ 
                borderRadius: 3, 
                height: 420, 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(18,50,67,0.03)',
                border: '1px solid rgba(18,50,67,0.04)',
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover img': { transform: 'scale(1.05)' }
              }}>
                <Box sx={{ overflow: 'hidden', flexShrink: 0 }}>
                   <CardMedia 
                      component="img" 
                      height="200" 
                      image={post.image} 
                      alt={post.title} 
                      sx={{ transition: 'transform 0.5s ease' }}
                   />
                </Box>
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ mb: 0.5, display: 'block', lineHeight: 1 }}>
                    {post.category}
                  </Typography>
                  <Typography variant="h4" gutterBottom fontSize={18} sx={{ lineHeight: 1.3, mb: 1.5 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {post.preview}
                  </Typography>
                  <Button variant="text" color="primary" endIcon={<ArrowRightAltIcon />} sx={{ alignSelf: 'flex-start', p: 0, minHeight: 0, '&:hover': { background: 'transparent' } }}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
