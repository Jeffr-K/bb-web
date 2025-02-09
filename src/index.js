import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { CafeProvider } from './context/CafeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CafeProvider>
        <App />
      </CafeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
