import React from 'react';
import s from "./ActionButton.module.scss";


const ActionButton = ({style, second, children,...props}) => {

    return (
        <button
          {...props}
              className={second ? s.button__second : s.button__primary}
              style={style}>
            {children}
        </button>

    );
};

export default ActionButton;
