import { CssBaseline, GlobalStyles } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.scss";
import "./normalize.css"; // должен быть сверху
import { store } from "./redux/store";

const theme = extendTheme({
  radius: {
    xs: "6px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <GlobalStyles styles={{ body: { overflow: "hidden" } }} />
      <App />
    </CssVarsProvider>
  </Provider>,
);
