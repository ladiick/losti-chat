import React from 'react';
import s from './Text.module.scss'

const Text = ({weight, children, className,type,...props}) => {

    const strong = weight === 'strong' ? `${s.text} ${s.text__medium}` : s.text;
    const typeText = type === 'button' ? `${s.text} ${s.text__button}` : s.text;

    const classTotal = className ? `${className} ${strong}` : weight ? strong : type ? typeText : s.text

    return (
        <span
          {...props}
              className={classTotal}>
            {children}
        </span>
    );
};

export default Text;
