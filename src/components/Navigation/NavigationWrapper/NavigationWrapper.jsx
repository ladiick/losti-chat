import React from 'react';
import s from "./NavigationWrapper.module.scss";
import logo from "../../assets/logo.svg";

const NavigationWrapper = ({children}) => {
    return (
        <div
            className={s.wrapper__navigation}>
            <nav className={s.nav__content}>
                <div className={s.name__company}>
					<span>
						<img src={logo} alt='logo'/>
						<h1>LOSTI-CHAT</h1>
					</span>
                </div>
                <ul className={s.list__items}>
                    {children}
                </ul>
            </nav>
        </div>
    );
};

export default NavigationWrapper;
