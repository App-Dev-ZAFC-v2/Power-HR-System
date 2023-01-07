import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {store} from './Redux/store';
import {Provider} from 'react-redux';
import { theme } from './theme';
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <Router>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </Router>
  </Provider>
  //</React.StrictMode>
);
