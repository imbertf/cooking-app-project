import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Supports weights 100-900
import "@fontsource-variable/jost";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
// theme porvider
import Theme from "./theme/Theme";
import { Auth0ProviderWithNavigate } from "./provider/Auth0ProviderWithNavigate";
import { BrowserRouter } from "react-router-dom";
// @ts-ignore

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();