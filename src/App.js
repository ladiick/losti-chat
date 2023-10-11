import React, { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.scss";
import "./normalize.css";

import Authorization from "./Pages/Authorization/Authorization";
import Registration from "./Pages/Registration/Registration";
import { Logout } from "./components/Logout/Logout";

import NotFound from "./components/NotFound/NotFound";
import { Layout } from "./modules/Layout/Layout.jsx";

import Grade from "./Pages/Grade/Grade";
import RegistrationFormStep1 from "./modules/Registration/components/RegistrationFormStep1/RegistrationFormStep1";
import RegistrationFormStep2 from "./modules/Registration/components/RegistrationFormStep2/RegistrationFormStep2";
import RegistrationFormStep3 from "./modules/Registration/components/RegistrationFormStep3/RegistrationFormStep3";
import RegistrationFormStep4 from "./modules/Registration/components/RegistrationFormStep4/RegistrationFormStep4";

// const Friends = lazy(() => import("./Pages/Friends/Friends"));
// const FriendsRequestsPage = lazy(() => import("./Pages/FriendsRequestsPage/FriendsRequestsPage"));
// const FriendsFind = lazy(() => import("./modules/Friends/components/FriendsFind/FriendsFind"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}/>
{/*
        <Route path="friends/*" element={<Friends />}>
          <Route path="requests" element={<FriendsRequestsPage />} />
          <Route path="find" element={<FriendsFind />} />
        </Route> */}
        {/* <Route path="friends/*" element={<Friends />}>
          <Route path="requests" element={<FriendsRequestsPage />} />
          <Route path="find" element={<FriendsFind />} />
        </Route> */}
        {/* <Route path="profile/:id" element={<Profile />} />
        <Route path="notification" element={<NotificationPage />} /> */}
        {/* <Route path="menu" element={<Menu />}>
          <Route path="appearance" element={<Appearance />} />
          <Route path="edit" element={<Settings />} />
        </Route> */}
      <Route path="*" element={<NotFound />} />
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/registration/*" element={<Registration />}>
        <Route index element={<RegistrationFormStep1 />} />
        <Route path="confirmation-code" element={<RegistrationFormStep2 />} />
        <Route path="password" element={<RegistrationFormStep3 />} />
        <Route path="about-user" element={<RegistrationFormStep4 />} />
      </Route>
      <Route path="/grade" element={<Grade />} />
    </>,
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
