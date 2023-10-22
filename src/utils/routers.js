import { lazy } from "react";

const Layout = lazy(() =>
  import("../modules/Layout/Layout").then((module) => ({ default: module.Layout })),
);
const NotFound = lazy(() => import("../components/NotFound/NotFound"));
const Logout = lazy(() =>
  import("../components/Logout/Logout").then((module) => ({ default: module.Logout })),
);
const Authorization = lazy(() => import("../Pages/Authorization/Authorization"));
const Registration = lazy(() => import("../Pages/Registration/Registration"));
// const Grade = lazy(() => import("../Pages/Grade/Grade"));

const RegistrationFormStep1 = lazy(() =>
  import("../modules/Registration/components/RegistrationFormStep1/RegistrationFormStep1"),
);

const RegistrationFormStep2 = lazy(() =>
  import("../modules/Registration/components/RegistrationFormStep2/RegistrationFormStep2"),
);

const RegistrationFormStep3 = lazy(() =>
  import("../modules/Registration/components/RegistrationFormStep3/RegistrationFormStep3"),
);

const RegistrationFormStep4 = lazy(() =>
  import("../modules/Registration/components/RegistrationFormStep4/RegistrationFormStep4"),
);

export const routers = [
  {
    path: "/",
    component: <Layout />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
  {
    path: "/authorization",
    component: <Authorization />,
  },
  {
    path: "/logout",
    component: <Logout />,
  },
  // {
  //   path: "/grade",
  //   component: <Grade />,
  // },
  {
    path: "/registration/*",
    component: <Registration />,
    children: [
      { index: true, component: <RegistrationFormStep1 /> },
      { path: "confirmation-code", component: <RegistrationFormStep2 /> },
      { path: "password", component: <RegistrationFormStep3 /> },
      { path: "about-user", component: <RegistrationFormStep4 /> },
    ],
  },
];
