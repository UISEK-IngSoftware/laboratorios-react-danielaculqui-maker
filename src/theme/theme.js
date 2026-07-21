import { createTheme } from '@mui/material/styles';

const commonSettings = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
};

// 🌕 Tema claro
export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
      main: '#CC0000',      
      light: '#FF4B4B',
      dark: '#8B0000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFCB05',      
      light: '#FFE066',
      dark: '#C9A000',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    error: { main: '#E53935' },
    warning: { main: '#FFA726' },
    info: { main: '#3B4CCA' },
    success: { main: '#4CAF50' },
    text: {
      primary: '#1A1A1A',
      secondary: '#4A4A4A',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: '0 4px 12px rgba(204, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 12 },
      },
    },
  },
});

// 🌑 Tema oscuro
export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF5252',      
      light: '#FF867F',
      dark: '#C50E29',
      contrastText: '#1A1A1A',
    },
    secondary: {
      main: '#FFD93D',      
      light: '#FFEB8A',
      dark: '#C9A700',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#121212',   
      paper: '#1E1E1E',
    },
    error: { main: '#EF5350' },
    warning: { main: '#FFB74D' },
    info: { main: '#5C6BC0' },   
    success: { main: '#66BB6A' },
    text: {
      primary: '#F5F5F5',
      secondary: '#B0B0B0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: '0 4px 12px rgba(255, 82, 82, 0.4)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 12 },
      },
    },
  },
});

export const theme = lightTheme;