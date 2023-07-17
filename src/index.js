import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./CSS__classes/exportClasses.scss";
import "@vkontakte/vkui/dist/vkui.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <Provider store={store}>
          <App />
        </Provider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>,
);
