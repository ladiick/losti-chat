import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.scss";

import { routers } from "./utils/routers";

const router = createBrowserRouter(
  createRoutesFromElements(
    routers.map((route) =>
      route?.children?.length ? (
        <Route path={route.path} element={route.component} key={route.path}>
          {route?.children?.map((routeChildren) => (
            <Route
              key={routeChildren.path ?? 10}
              index={routeChildren.index ?? false}
              path={routeChildren.path}
              element={<Suspense>{routeChildren.component}</Suspense>}
            />
          ))}
        </Route>
      ) : (
        <Route
          key={route.path}
          path={route.path}
          element={<Suspense>{route.component}</Suspense>}
        />
      ),
    ),
  ),
);

function App() {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
