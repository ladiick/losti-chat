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
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.bgcolor === "surface" && {
            backgroundColor: theme.vars.palette.background.surface,
          }),
          ...(ownerState.circle === true && {
            borderRadius: `50%`,
          }),
          ...(ownerState.size === "xxl" && {
            [theme.breakpoints.down("sm")]: {
              width: "2.875rem",
              height: "2.875rem",
            },
            [theme.breakpoints.up("sm")]: {
              width: "3.5rem",
              height: "3.5rem",
            },
          }),
        }),
      },
    },
    JoyIconButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.bgcolor === "surface" && {
            backgroundColor: theme.vars.palette.background.surface,
          }),
          ...(ownerState.circle === true && {
            borderRadius: `50%`,
          }),
          ...(ownerState.size === "xxl" && {
            [theme.breakpoints.down("sm")]: {
              width: "2.875rem",
              height: "2.875rem",
            },
            [theme.breakpoints.up("sm")]: {
              width: "3.5rem",
              height: "3.5rem",
            },
          }),
        }),
      },
    },
    JoyCircularProgress: {
      defaultProps: {
        size: "sm",
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
