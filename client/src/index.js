import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./styles/index.scss";
import { theme } from "utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./contexts/authContext";
import PostContextProvider from "./contexts/postContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
            <ToastContainer pauseOnHover={false} />
          </BrowserRouter>
        </ThemeProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
