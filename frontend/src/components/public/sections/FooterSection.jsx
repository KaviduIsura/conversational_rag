import React from 'react';
import { Box, Typography, Container, Grid, IconButton, Divider, Link as MuiLink } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: '#0B131E', color: 'rgba(255,255,255,0.7)', pt: 10, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, letterSpacing: '-1px', mb: 3 }}>
              LuminaTravel.
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, maxWidth: 300, lineHeight: 1.8 }}>
              Elevating the art of travel. We curate the world's most extraordinary destinations into unforgettable experiences that inspire and transform.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'primary.main', bgcolor: 'rgba(255,255,255,0.05)' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'primary.main', bgcolor: 'rgba(255,255,255,0.05)' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'secondary.main', bgcolor: 'rgba(255,255,255,0.05)' } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'primary.main', bgcolor: 'rgba(255,255,255,0.05)' } }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Links Columns */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" color="white" sx={{ mb: 3, fontSize: 16, fontWeight: 600 }}>Company</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>About Us</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Careers</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Press</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Blog</MuiLink>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" color="white" sx={{ mb: 3, fontSize: 16, fontWeight: 600 }}>Destinations</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Europe</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Asia</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Americas</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Africa</MuiLink>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" color="white" sx={{ mb: 3, fontSize: 16, fontWeight: 600 }}>Support</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Help Center</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Contact Us</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Safety Notes</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Cancellation Policy</MuiLink>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" color="white" sx={{ mb: 3, fontSize: 16, fontWeight: 600 }}>Legal</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Terms of Service</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Privacy Policy</MuiLink>
              <MuiLink href="#" underline="none" sx={{ color: 'inherit', '&:hover': { color: 'white' } }}>Cookie Policy</MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            &copy; {currentYear} LuminaTravel Inc. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Designed with absolute precision.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
