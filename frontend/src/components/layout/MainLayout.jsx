import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, useMediaQuery, Drawer, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ContextPanel } from '../chat/ContextPanel';

const DRAWER_WIDTH = 320;

export const MainLayout = ({ children, toggleColorMode, currentMode, onNewSession }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getGlassNavStyle = () => ({
    background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
    color: theme.palette.text.primary,
    boxShadow: 'none',
  });

  const drawerElement = (
    <Box sx={{ height: '100%', pt: 2 }}>
      <ContextPanel />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: 'background.default' }}>
      {/* Top Navbar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, ...getGlassNavStyle() }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '-0.5px' }}>
            <Box component="span" sx={{ color: 'primary.main' }}>Conv</Box>RAG
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="New Session">
              <IconButton color="inherit" onClick={onNewSession} sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle light/dark mode">
               <IconButton sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }} onClick={toggleColorMode} color="inherit">
                 {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
               </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar for Desktop */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, border: 'none', bgcolor: 'background.paper' },
          }}
        >
          {drawerElement}
        </Drawer>
        
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
              bgcolor: 'background.default',
              pt: '64px' // Toolbar height
            },
          }}
          open
        >
          {drawerElement}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          pt: '64px', // Toolbar height
          bgcolor: 'background.default',
          position: 'relative'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
