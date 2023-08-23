import React from "react";
import s from "./WrapperBlocks.module.scss";
const WrapperBlocks = ({ header, children, className, ...props }) => {
  const classGeneral = className ? `${className} ${s.wrapper}` : s.wrapper;

  return (
    <div className={classGeneral} {...props}>
      {header ? header : null}
      {children}
    </div>
  );
};

export default WrapperBlocks;
