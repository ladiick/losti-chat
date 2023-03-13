import React from 'react';
import s from "./Loader.module.scss";

const LoaderWrapper = ({children,top}) => {

    return (
        <div className={s.wrapper__load} style={top ? {top: '10%'} : {}}>
            {children}
        </div>
    );
};

export default LoaderWrapper;