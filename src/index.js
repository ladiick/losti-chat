import { CssBaseline, GlobalStyles } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { colorPalette } from "./colorPalette";
import "./index.scss";
import "./normalize.css"; // должен быть сверху
import { store } from "./redux/store";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        ...colorPalette,
        background: {
          body: "var(--joy-palette-neutral-300)",
        },
      },
    },
    dark: {
      palette: {
        ...colorPalette,
        background: {
          body: "#101010",
        },
      },
    },
  },
  radius: {
    xs: "10px",
    sm: "12px",
    md: "16px",
    lg: "20px",
    xl: "24px",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CssVarsProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <GlobalStyles styles={{ body: { overflow: "hidden" } }} />
      <App />
    </CssVarsProvider>
  </Provider>,
);
