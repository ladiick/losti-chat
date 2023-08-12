import React from "react";
import logo from "../../assets/logo.svg";
import s from "./NameCompany.module.scss";

const NameCompany = ({ size, direction, title, ...props }) => {
  const columnContent = direction === "column" ? `${s.wrapper__company} ${s.wrapper__company__column}` : s.wrapper__company;

  const sizeIcon = size ? { width: size, height: size } : {};

  return (
    <div className={columnContent} {...props}>
      <img className={s.icon__title} src={logo} alt="logo" style={sizeIcon} />
      <h1 className={s.title}>{title}</h1>
    </div>
  );
};

export default NameCompany;
