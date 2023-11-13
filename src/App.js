import React, { Suspense, lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.scss";

const Layout = lazy(() =>
  import("./Pages/Layout/Layout").then((module) => ({ default: module.Layout })),
);
const Authorization = lazy(() => import("./Pages/Authorization/Authorization"));
const Registration = lazy(() => import("./Pages/Registration/Registration"));

const RegistrationFormStep1 = lazy(() =>
  import("./modules/Registration/components/RegistrationFormStep1/RegistrationFormStep1"),
);

const RegistrationFormStep2 = lazy(() =>
  import("./modules/Registration/components/RegistrationFormStep2/RegistrationFormStep2"),
);

const RegistrationFormStep3 = lazy(() =>
  import("./modules/Registration/components/RegistrationFormStep3/RegistrationFormStep3"),
);

const RegistrationFormStep4 = lazy(() =>
  import("./modules/Registration/components/RegistrationFormStep4/RegistrationFormStep4"),
);
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Logout = lazy(() =>
  import("./components/Logout/Logout").then((module) => ({ default: module.Logout })),
);

const router = createBrowserRouter(
  createRoutesFromElements(
    // routers.map((route, index) =>
    //   route?.children?.length !== 0 ? (
    //     <Route path={route.path} element={route.component} key={route.path}>
    //       {route?.children?.map((routeChildren) => (
    //         <Route
    //           key={routeChildren.path ?? 10}
    //           index={routeChildren.index ?? false}
    //           path={routeChildren.path}
    //           element={<Suspense>{routeChildren.component}</Suspense>}
    //         />
    //       ))}
    //     </Route>
    //   ) : (
    //     <Route
    //       key={route.path}
    //       path={route.path}
    //       element={<Suspense>{route.component}</Suspense>}
    //     />
    //   ),
    // ),
    <>
      <Route
        path="/"
        element={
          <Suspense>
            <Layout />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense>
            <NotFound />
          </Suspense>
        }
      />
      <Route
        path="/logout"
        element={
          <Suspense>
            <Logout />
          </Suspense>
        }
      />
      <Route
        path="/authorization"
        element={
          <Suspense>
            <Authorization />
          </Suspense>
        }
      />
      <Route
        path="/registration/*"
        element={
          <Suspense>
            <Registration />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense>
              <RegistrationFormStep1 />
            </Suspense>
          }
        />
        <Route
          path="confirmation-code"
          element={
            <Suspense>
              <RegistrationFormStep2 />
            </Suspense>
          }
        />
        <Route
          path="password"
          element={
            <Suspense>
              <RegistrationFormStep3 />
            </Suspense>
          }
        />
        <Route
          path="about-user"
          element={
            <Suspense>
              <RegistrationFormStep4 />
            </Suspense>
          }
        />
      </Route>
    </>,
  ),
);

function App() {
  const theme = useSelector((state) => state.theme);
  // const [, setLoadingDocument] = useState(true);
  // const spinner = document.querySelector(".loader");
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // useEffect(() => {
  //   const loading = () => {
  //     spinner.classList.add("loader_hidden");
  //     setLoadingDocument(false);
  //   };
  //   setTimeout(loading, 2000);
  //   return () => {
  //     clearTimeout(loading);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <RouterProvider router={router} />;
}

export default App;
