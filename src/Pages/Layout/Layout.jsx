import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useGetUserQuery } from "../../components/features/userApiSlice";
import useWebsocket from "../../components/hooks/useWebsocket";
import LeftColumn from "../../modules/LeftColumn/LeftColumn";
import MiddleColumn from "../../modules/MiddleColumn/MiddleColumn";
import Home from "./components/Home/Home";
export const MyContext = React.createContext();

const Layout = () => {
  const userAccessToken = useSelector((state) => state.user.tokens.access);
  const [socket, statusSocket, newMessage] = useWebsocket(userAccessToken);

  const [dataAttribute, setDataAttribute] = useState("");

  useGetUserQuery();

  useEffect(() => {
    setDataAttribute(localStorage.getItem("theme"));
  }, []);

  useEffect(() => {
    document.title = "Сообщения";
  }, []);

  // if (!localStorage.getItem("accessToken") || localStorage.getItem("accessToken") === "undefined") {
  //   window.location.href = "/logout";
  // }

  return (
    <>
      <MyContext.Provider value={{ socket, statusSocket, newMessage }}>
        <Home>
          <LeftColumn />
          <MiddleColumn />
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
