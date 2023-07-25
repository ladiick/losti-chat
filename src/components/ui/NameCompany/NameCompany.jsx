import React from "react";
import logo from "../../assets/logo.svg";
import Title from "../Title/Title";
import s from "./NameCompany.module.scss";

const NameCompany = ({ size, direction, title,...props }) => {
  const columnContent = direction === "column" ? `${s.wrapper__company} ${s.wrapper__company__column}` : s.wrapper__company;

  const sizeIcon = size ? { width: size, height: size } : {};

  return (
    <div className={columnContent} {...props}>
      <img src={logo} alt="logo" style={sizeIcon} />
      <Title level={4}>{title}</Title>
    </div>
  );
};

export default NameCompany;
