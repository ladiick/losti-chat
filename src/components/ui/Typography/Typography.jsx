import React from "react";
import s from "./Typography.module.scss";

const Typography = ({ as, level = "h1", weight = "regular", color, children, ...props }) => {
  const tag = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    bodyL: "span",
    bodyM: "span",
    bodyS: "span",
    bodyXs: `span`,
    caption: `span`,
  };

  const colors = {
    primary: s.primary__color,
    neutral: s.neutral__color,
    danger: s.danger__color,
    success: s.success__color,
  };

  const fontStyle = {
    h1: s.headline__h1,
    h2: s.headline__h2,
    h3: s.headline__h3,
    bodyL: s[`bodyL__${weight}`],
    bodyM: s[`bodyM__${weight}`],
    bodyS: s[`bodyS__${weight}`],
    bodyXs: s[`bodyXs__${weight}`],
    caption: s[`caption__${weight}`],
  };

  const Tag = `${as || tag[level]}`;

  return (
    <Tag className={`${s.general} ${fontStyle[level]} ${colors[color || "neutral"]}`} {...props}>
      {children}
    </Tag>
  );
};

export default React.memo(Typography);
