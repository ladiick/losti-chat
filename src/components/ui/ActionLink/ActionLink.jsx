import React from "react";
import { Link } from "react-router-dom";
import s from "./ActionLink.module.scss";

const ActionLink = ({ weight, size, defaultColor, children, className, noHover, ...props }) => {
  const selectClass =
    className && noHover
      ? `${className} ${s.no__hover} ${s.link}`
      : className
      ? `${className} ${s.link}`
      : noHover
      ? `${s.no__hover} ${s.link}`
      : s.link;

  const selectWeight = weight ? `${selectClass} Text--${weight}` : "";

  const selectColor = defaultColor ? s.defaultColor : "";

  const selectFontSize = size ? `Font--${size}` : `Font--13`;

  const classGeneral = `${selectClass} ${selectWeight} ${selectColor} ${selectFontSize}`;

  return (
    <Link className={classGeneral} {...props}>
      {children}
    </Link>
  );
};

export default ActionLink;
