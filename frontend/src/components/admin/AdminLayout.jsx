import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  ThemeProvider,
  CssBaseline
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SettingsIcon from "@mui/icons-material/Settings";
import TourIcon from "@mui/icons-material/Tour";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ArticleIcon from "@mui/icons-material/Article";
import PaymentIcon from "@mui/icons-material/Payment";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { adminTheme } from "../../theme/adminTheme";

const DRAWER_WIDTH = 260;

export const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Destinations", icon: <FlightTakeoffIcon />, path: "/admin/destinations" },
    { text: "Tours & Packages", icon: <TourIcon />, path: "/admin/tours" },
    { text: "Bookings", icon: <BookOnlineIcon />, path: "/admin/bookings" },
    { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
    { text: "Reviews", icon: <RateReviewIcon />, path: "/admin/reviews" },
    { text: "Gallery", icon: <PhotoLibraryIcon />, path: "/admin/gallery" },
    { text: "Blog Posts", icon: <ArticleIcon />, path: "/admin/blog" },
    { text: "Knowledge Base", icon: <LibraryBooksIcon />, path: "/admin/knowledge-base" },
    { text: "Payments", icon: <PaymentIcon />, path: "/admin/payments" },
    { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" }
  ];

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" fontWeight={700}>
          Travel Admin
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ px: 2, py: 2 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: active ? "primary.main" : "transparent",
                color: active ? "#fff" : "text.secondary",
                "&:hover": {
                  backgroundColor: active ? "primary.dark" : "action.hover"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "#fff" : "text.secondary",
                  minWidth: 36
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: active ? 600 : 500
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Travel Admin Panel v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />

      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* AppBar */}

        <AppBar
  position="fixed"
  elevation={1}
  sx={{
    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
    ml: { sm: `${DRAWER_WIDTH}px` },
    backgroundColor: "#0f172a",
    color: "#fff"
  }}
>
          
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" fontWeight={600}>
              {navItems.find((i) => i.path === location.pathname)?.text ||
                "Dashboard"}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}

        <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { width: DRAWER_WIDTH }
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { width: DRAWER_WIDTH }
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            mt: 8,
            overflowY: "auto",
            backgroundColor: "background.default"
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};