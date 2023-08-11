import { Link } from "react-router-dom";
import { colors } from "../ActionButton/ActionButton";
import s from "../Button.module.scss";
export const IconButton = ({ size,children, type, to, fullWidth, color, ...props }) => {

  const icon = `${s.icon} ${s.single__icon}`

   const variantSize = {
     md: `${s.btn__mdSize}`,
     lg: `${s.btn__lgSize}`,
   };
 
  const variants = {
    solid: `${icon} ${s.btn__default} ${variantSize[size || "md"]}  ${fullWidth && s.btn__fullWidth} ${colors["solid"][color || "primary"]}`,
    outline: `${icon} ${s.btn__default} ${variantSize[size || "md"]} ${fullWidth && s.btn__fullWidth} ${colors["outline"][color || "primary"]}`,
  };

  if (to) {
    return (
      <Link className={variants[type || "solid"]} {...props} to={to}>
        {children}
      </Link>
    );
  }
  return (
    <button className={variants[type || "solid"]} {...props}>
      {children}
    </button>
  );
};

