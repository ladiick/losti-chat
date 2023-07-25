import React from "react";
import s from "./NavigationWrapper.module.scss";

const NavigationWrapper = ({ children, ...props }) => {
  return (
    <div className={s.wrapper__navigation} {...props}>
      <nav className={s.nav__content}>{children}</nav>
    </div>
  );
};

export default NavigationWrapper;
