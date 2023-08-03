import React from "react";
import Title from "../Title/Title";
import s from "./WrapperBlocks.module.scss";
const WrapperBlocks = ({ title, children, block, className, ...props }) => {
  const classGeneral = className ? `${className} ${s.wrapper}` : s.wrapper;

  return (
    <div className={classGeneral} {...props}>
      {block || title ? (
        <div className={s.block}>
          {title && <Title size={16}>{title}</Title>}
          {block}
        </div>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default WrapperBlocks;
