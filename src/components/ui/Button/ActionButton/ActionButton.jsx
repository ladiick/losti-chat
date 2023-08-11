import React from "react";
import { Link } from "react-router-dom";
import s from "../Button.module.scss";
import ButtonLoading from '../ButtonLoading/ButtonLoading'

export const colors = {
  solid: {
    primary: `${s.btn__primarySolidColor}`,
    success: `${s.btn__successSolidColor}`,
    danger: `${s.btn__dangerSolidColor}`,
  },
  outline: {
    primary: `${s.btn__primaryOutlineColor}`,
    success: `${s.btn__successOutlineColor}`,
    danger: `${s.btn__dangerOutlineColor}`,
  },
};

export const ActionButton = ({ size,leftIcon, rightIcon, to, type, color, fullWidth, children, loading, ...props }) => {

  const variantSize = {
    md: `${s.btn__mdSize}`,
    lg: `${s.btn__lgSize}`,
  };
  
  const variants = {
    solid: `${s.btn__default} ${variantSize[size || "md"]} ${fullWidth && s.btn__fullWidth} ${colors["solid"][color || "primary"]}`,
    outline: `${s.btn__default} ${variantSize[size || "md"]} ${fullWidth && s.btn__fullWidth} ${colors["outline"][color || "primary"]}`,
  };

  if (to) {
    return (
      <Link className={variants[type || "solid"]} {...props} to={to}>
        <ButtonWithIcon leftIcon={leftIcon} rightIcon={rightIcon}>
          {children}
        </ButtonWithIcon>
      </Link>
    );
  }

  return (
    <button className={variants[type || "solid"]} {...props}>
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

  const icons = {
    leftIcon: `${s.icon} ${s.leftIcon}`,
    rightIcon: `${s.icon} ${s.rightIcon}`,
  };

  return (
    <>
      {leftIcon && <span className={icons["leftIcon"]}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={icons["rightIcon"]}>{rightIcon}</span>}
    </>
  );
};
