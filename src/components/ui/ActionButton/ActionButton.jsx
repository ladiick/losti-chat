import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import LoaderWrapper from "../LoaderWrapper/LoaderWrapper";
import Text from "../Text/Text";
import s from "./ActionButton.module.scss";

export const ActionButton = ({ leftIcon, rightIcon, to, type, color, fullWidth, second, children, loading, ...props }) => {
  const colors = {
    success: `${s.btn__success}`,
    danger: `${s.btn__danger}`,
  };
  const variants = {
    primary: `${s.btn__default} ${s.btn__primary} ${fullWidth && s.btn__fullWidth} ${colors[color]}`,
    outline: `${s.btn__default} ${s.btn__outline} ${fullWidth && s.btn__fullWidth} ${colors[color]}`,
  };
  
  if (to) {
    return (
      <Link className={variants[type || "primary"]} {...props} to={to}>
        <ButtonWithIcon leftIcon={leftIcon} rightIcon={rightIcon}>
          {children}
        </ButtonWithIcon>
      </Link>
    );
  }

  return (
    <button className={variants[type || "primary"]} {...props}>
      {loading ? (
        <ButtonLoading loading={loading} />
      ) : (
        <ButtonWithIcon leftIcon={leftIcon} rightIcon={rightIcon}>
            {children}
        </ButtonWithIcon>
      )}
    </button>
  );
};

const ButtonWithIcon = ({ leftIcon, rightIcon, children }) => {
  return (
    <>
      {leftIcon && <span className={s.leftIcon}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={s.rightIcon}>{rightIcon}</span>}
    </>
  );
};

const ButtonLoading = ({ loading }) => {
  return (
    <LoaderWrapper center>
      <Loader height={"20"} width={"20"} visible={loading} />
    </LoaderWrapper>
  );
};

export const IconButton = ({ children, type, to, fullWidth, color, ...props }) => {
  const colors = {
    success: `${s.btn__success}`,
    danger: `${s.btn__danger}`,
  };

  const variants = {
    primary: `${s.single__icon} ${s.btn__default} ${s.btn__primary} ${fullWidth && s.btn__fullWidth} ${colors[color]}`,
    outline: `${s.single__icon} ${s.btn__default} ${s.btn__outline} ${fullWidth && s.btn__fullWidth} ${colors[color]}`,
  };


  if (to) {
    return (
      <Link className={variants[type || "primary"]} {...props} to={to}>
        {children}
      </Link>
    );
  }
    return (
      <button className={variants[type || "primary"]} {...props}>
        {children}
      </button>
    );
};
