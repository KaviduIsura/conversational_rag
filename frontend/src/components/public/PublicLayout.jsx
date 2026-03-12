import React, { useState, useEffect } from 'react';
import { Box, Typography, ThemeProvider, CssBaseline, AppBar, Toolbar, Button, IconButton, Badge, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { publicTheme } from '../../theme/publicTheme';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export const PublicLayout = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={publicTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Global Sticky Header */}
        <AppBar 
          position="fixed" 
          elevation={scrolled ? 4 : 0} 
          sx={{ 
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            color: scrolled ? 'text.primary' : 'white',
            transition: 'all 0.3s ease-in-out',
            borderBottom: scrolled ? '1px solid rgba(18, 50, 67, 0.05)' : '1px solid transparent'
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: 70, md: 90 } }}>
              {/* Logo */}
              <Typography 
                variant="h3" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{ 
                  cursor: 'pointer',
                  color: scrolled ? 'primary.main' : 'white', 
                  fontWeight: 800, 
                  letterSpacing: '-1px',
                  transition: 'color 0.3s'
                }}
              >
                LuminaTravel.
              </Typography>

              {/* Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                <Button onClick={() => scrollToSection('destinations')} color="inherit" sx={{ fontWeight: 600, fontSize: '15px', '&:hover': { color: 'primary.main', background: 'transparent' } }}>Destinations</Button>
                <Button onClick={() => scrollToSection('experiences')} color="inherit" sx={{ fontWeight: 600, fontSize: '15px', '&:hover': { color: 'primary.main', background: 'transparent' } }}>Experiences</Button>
                <Button onClick={() => scrollToSection('tours')} color="inherit" sx={{ fontWeight: 600, fontSize: '15px', '&:hover': { color: 'primary.main', background: 'transparent' } }}>Tours</Button>
                <Button onClick={() => scrollToSection('reviews')} color="inherit" sx={{ fontWeight: 600, fontSize: '15px', '&:hover': { color: 'primary.main', background: 'transparent' } }}>Reviews</Button>
                <Button onClick={() => scrollToSection('blog')} color="inherit" sx={{ fontWeight: 600, fontSize: '15px', '&:hover': { color: 'primary.main', background: 'transparent' } }}>Blog</Button>
                <Button onClick={() => scrollToSection('contact')} color="inherit" sx={{ fontWeight: 600, fontSize: '15px', '&:hover': { color: 'primary.main', background: 'transparent' } }}>Contact</Button>
              </Box>

              {/* Actions */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton color="inherit" sx={{ display: { xs: 'none', sm: 'inline-flex' }, '&:hover': { color: 'primary.main' } }}>
                  <SearchIcon />
                </IconButton>
                <IconButton color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>
                  <PersonOutlineIcon />
                </IconButton>
                <Button variant="contained" color="primary" sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
                  Book Now
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        
        {/* Route Content Area */}
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
