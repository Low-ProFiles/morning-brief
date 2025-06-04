import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; 
import './index.css';
import App from './App.tsx';
import authInstance from '.services/auth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App auth={authInstance}/>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
