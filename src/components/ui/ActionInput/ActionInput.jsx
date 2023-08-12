import React, { useRef, useState } from "react";
import s from "./ActionInput.module.scss";

const ActionInput = React.forwardRef((props, ref) => {
  const [isControlFocus, setIsControlFocus] = useState();
  const { icon, style, ...propsInput } = props;

  const refInput = useRef();

  const handleClick = () => {
    refInput?.current?.focus();
    setIsControlFocus(true);
  };

  const inputBlur = (e) => {
    setIsControlFocus(false);
  };
  
  const refGroup = (e) => {
    refInput.current = e;
    if (ref) {
      ref(e)
    }
  };

  const inputControl = isControlFocus ? `${s.input__control} ${s.input__controlFocused}` : s.input__control;

  return (
    <div className={inputControl} style={style} onClick={handleClick}>
      <input {...propsInput} ref={refGroup} className={s.action__input} onBlur={inputBlur} />
      <span className={s.input__icon}>{icon}</span>
    </div>
  );
});

export default ActionInput;
