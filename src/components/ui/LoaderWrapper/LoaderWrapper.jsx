import React from "react";
import s from "./Loader.module.scss";

const LoaderWrapper = ({ children, top, center }) => {
  return (
    <div
      className={center ? s.center : s.wrapper__load}
      style={top ? { top: "10%" } : {}}
    >
      {children}
    </div>
  );
};

export default LoaderWrapper;
