import React from 'react';
import s from "./ActionButton.module.scss";


const ActionButton = ({onClick, style, second, children}) => {
    return (

        <span className={second ? s.button__second : s.button__primary} onClick={onClick}
              style={style}>{children}</span>

    );
};

export default ActionButton;
