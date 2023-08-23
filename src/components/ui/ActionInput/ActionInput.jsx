import React, { useRef, useState } from "react";
import s from "./ActionInput.module.scss";

const ActionInput = React.forwardRef((props, ref) => {
  const { icon, style, ...propsInput } = props;



  // const inputControl = isControlFocus ? `${s.input__control} ${s.input__controlFocused}` : s.input__control;

  return (
    <div className={s.control__block} style={style}>
      <input {...propsInput} ref={ref} className={s.action__input} />
      <span className={s.input__icon}>{icon}</span>
    </div>
  );
});

export default ActionInput;
