import React from "react";
import Typography from "../Typography/Typography";
import s from "./WrapperBlocks.module.scss";
const WrapperBlocks = ({ title, children, block, className, ...props }) => {
  const classGeneral = className ? `${className} ${s.wrapper}` : s.wrapper;

  return (
    <div className={classGeneral} {...props}>
      {block || title ? (
        <div className={s.block}>
          {title && <Typography size={16}>{title}</Typography>}
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
