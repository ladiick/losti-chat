import React from "react";
import s from "./Text.module.scss";

const Text = ({ pointer, size, weight, children, className, type, ...props }) => {
  const strong = weight === "strong" ? `${s.text} ${s.text__medium}` : "";

  const typeText = type === "button" ? `${s.text} ${s.text__button}` : "";

  const fontSize = size ? `Font--${size} ${s.text}` : `Font--13`;

  const selectClass = className ? `${className} ${s.text}` : s.text;

  const cursor = pointer ? s.cursor : "";

  // const classTotal =
  // 	className ? `${className} ${strong}` : weight ? strong : type ? typeText : s.text

  const generalClass = `${strong} ${typeText} ${fontSize} ${selectClass} ${cursor}`;

  return (
    <span {...props} className={generalClass}>
      {children}
    </span>
  );
};

export default Text;
