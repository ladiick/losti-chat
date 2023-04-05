import React from 'react';
import s from './Text.module.scss'

const Text = ({weight, children, className,...props}) => {

    const strong = weight === 'strong' ? `${s.text} ${s.text__medium}` : s.text;
    return (
        <span
          {...props}
              className={className ? `${className} ${strong}` : strong}>
            {children}
        </span>
    );
};

export default Text;
