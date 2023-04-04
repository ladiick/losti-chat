import React from 'react';
import s from './Title.module.scss'

const Title = ({children, style, level = 1}) => {


    return (
        <h1 style={style} className={s.title}>
            {children}
        </h1>

    );
};

export default Title;
