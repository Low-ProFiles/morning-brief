import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customSpacing: {
      pagePaddingTop: number;
      pagePaddingBottom: number;
    };
  }
  interface ThemeOptions {
    customSpacing?: {
      pagePaddingTop?: number;
      pagePaddingBottom?: number;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'BMJUA, sans-serif',
    h5: {
      fontSize: '2rem',
      lineHeight: '2.5rem',
    },
    h6: {
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },

  palette: {
    primary: {
      main: '#FFC107',
    },
    secondary: {
      main: '#EC6767',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
    background: {
      default: '#FFFFFF',
    },
    grey: {
      100: '#E1E1E1',
    },
  },

  shape: {
    borderRadius: 12,
  },

  spacing: 8,

  customSpacing: {
    pagePaddingTop: 3,
    pagePaddingBottom: 6,
  },

  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
          '&.Mui-focusVisible': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 430,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },
  },
});

export default theme;
