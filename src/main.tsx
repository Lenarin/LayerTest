import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@emotion/react";
import theme from "./theme.ts";
import {CssBaseline} from "@mui/material";
import {StarknetProvider} from "./contexts/StarknetContext.tsx";
import {SnackbarProvider} from "notistack";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <StarknetProvider>
          <SnackbarProvider maxSnack={3}>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <App />
              </ThemeProvider>
          </SnackbarProvider>
      </StarknetProvider>
  </React.StrictMode>,
)