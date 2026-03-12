import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ThemeProvider, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SettingsIcon from '@mui/icons-material/Settings';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { adminTheme } from '../../theme/adminTheme';

const DRAWER_WIDTH = 280;

export const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Destinations', icon: <FlightTakeoffIcon />, path: '/admin/destinations' },
    { text: 'Knowledge Base', icon: <LibraryBooksIcon />, path: '/admin/knowledge-base' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" fontWeight="bold" color="primary.light">
          Travel Admin
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.text} 
            button 
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{
              margin: '8px 16px',
              borderRadius: 2,
              backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.light' : 'rgba(255,255,255,0.7)', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                color: location.pathname === item.path ? '#fff' : 'rgba(255,255,255,0.7)',
                fontWeight: location.pathname === item.path ? 600 : 400
              }} 
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
         <Typography variant="caption" color="rgba(255,255,255,0.5)">
            Conversational RAG Backend<br/>v1.0.0
         </Typography>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
        <AppBar 
          position="fixed" 
          sx={{ 
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, 
            ml: { sm: `${DRAWER_WIDTH}px` },
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 1
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              {navItems.find(i => i.path === location.pathname)?.text || 'Admin'}
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRight: 'none' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, overflowY: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
