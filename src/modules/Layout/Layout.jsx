import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useGetUserQuery } from "../../components/features/userApiSlice";
import useWebsocket from "../../components/hooks/useWebsocket";
import Home from "./components/Home/Home";

export const MyContext = React.createContext();

const Layout = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const userAccessToken = useSelector((state) => state.user.tokens.access);
  const [socket, statusSocket, newMessage] = useWebsocket(userAccessToken);

  const [dataAttribute, setDataAttribute] = useState("");

  useGetUserQuery();

  useEffect(() => {
    setDataAttribute(localStorage.getItem("theme"));
  }, []);

  if (!localStorage.getItem("accessToken") || localStorage.getItem("accessToken") === "undefined") {
    window.location.href = "/logout";
  }

  return (
    <>
      <MyContext.Provider value={{ socket, statusSocket, newMessage }}>
        <Home>
          <Outlet />
        </Home>
      </MyContext.Provider>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={dataAttribute === "light" ? "light" : "dark"}
      />
    </>
  );
};

export { Layout };
