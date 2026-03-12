import { createTheme } from '@mui/material/styles';

export const adminTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Standard Material-UI Blue
    },
    secondary: {
      main: '#34d399', // Mint green accent
    },
    background: {
      default: '#f5f5f5', // Standard gray background for admin panels
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E293B',
          color: '#ffffff',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        }
      }
    }
  }
});
