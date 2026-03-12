import { createTheme } from '@mui/material/styles';

export const publicGlassStyle = {
  background: 'rgba(251, 253, 255, 0.7)', // Neutral 100 with opacity
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  boxShadow: '0 8px 32px 0 rgba(11, 118, 255, 0.05)', // Ocean blue shadow
};

export const publicTheme = createTheme({
  spacing: 8,
  palette: {
    mode: 'light',
    primary: {
      main: '#0B76FF', // Ocean blue
      light: '#4d9eff',
      dark: '#005bb5',
    },
    secondary: {
      main: '#FF8A00', // Sunset orange
      light: '#ffaa4d',
      dark: '#cc6e00',
    },
    success: {
      main: '#16A34A',
    },
    background: {
      default: '#FBFDFF', // Neutral 100
      paper: '#F1F6FB',   // Neutral 300
    },
    text: {
      primary: '#123243', // Neutral 700
      secondary: '#476378',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '48px', letterSpacing: '-0.02em', lineHeight: 1.1 },
    h2: { fontWeight: 700, fontSize: '32px', letterSpacing: '-0.01em', lineHeight: 1.2 },
    h3: { fontWeight: 600, fontSize: '22px', lineHeight: 1.3 },
    h4: { fontWeight: 600, fontSize: '18px', lineHeight: 1.4 },
    body1: { fontWeight: 400, fontSize: '16px', lineHeight: 1.6 },
    body2: { fontWeight: 400, fontSize: '14px', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 12, // 12px for cards
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24, // Rounder buttons by default
          padding: '10px 24px',
          boxShadow: '0 4px 14px 0 rgba(11, 118, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px 0 rgba(11, 118, 255, 0.2)',
          }
        },
        containedPrimary: {
          backgroundColor: '#0B76FF',
          color: 'white',
          '&:hover': {
            backgroundColor: '#005bb5',
          }
        },
        containedSecondary: {
            backgroundColor: '#FF8A00',
            color: 'white',
            '&:hover': {
              backgroundColor: '#cc6e00',
            }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#F1F6FB', // Neutral 300
          borderRadius: 12,
          border: '1px solid rgba(18, 50, 67, 0.05)',
          boxShadow: 'none',
        }
      }
    },
    MuiContainer: {
        styleOverrides: {
            maxWidthLg: {
                maxWidth: '1400px !important'
            }
        }
    }
  },
});
