import React from "react";
import Loader from "../Loader/Loader";
import LoaderWrapper from "../LoaderWrapper/LoaderWrapper";
import s from "./ActionButton.module.scss";

const ActionButton = ({ leftIcon, rightIcon, className, second, children, loading, ...props }) => {
  const classGeneral =
    className && second ? `${className} ${s.button__second}` : className ? `${className} ${s.button__primary}` : second ? s.button__second : s.button__primary;

  const singleLeftIcon = rightIcon ? s.leftIcon : s.single__icon;

  const singleRightsIcon = leftIcon ? s.rightIcon : s.single__icon;

  if (loading) {
    return (
      <button className={classGeneral} {...props}>
        <span className={s.content__btn}>
          <LoaderWrapper center>
            <Loader height={"20"} width={"20"} />
          </LoaderWrapper>
        </span>
      </button>
    );
  }

  if (!children) {
    return (
      <button className={classGeneral} {...props}>
        <span className={s.content__btn}>
          {leftIcon && <span className={singleLeftIcon}>{leftIcon}</span>}
          {rightIcon && <span className={singleRightsIcon}>{rightIcon}</span>}
        </span>
      </button>
    );
  }

  return (
    <button {...props} className={classGeneral}>
      <span className={s.content__btn}>
        {leftIcon && <span className={s.leftIcon}>{leftIcon}</span>}
        {children ? <span className={s.children}>{children}</span> : ""}
        {rightIcon && <span className={s.rightIcon}>{rightIcon}</span>}
      </span>
    </button>
  );
};

export default ActionButton;
