import React from 'react';
import s from './Text.module.scss'

const Text = ({style, weight, children, className}) => {

    const strong = weight === 'strong' ? `${s.text} ${s.text__medium}` : s.text;

    return (
        <span style={style}
              className={className ? `${className} ${strong}` : strong}>
            {children}
        </span>
    );
};

export default Text;
