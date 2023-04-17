import React from 'react';
import s from "./NavigationWrapper.module.scss";
import logo from "../../assets/logo.svg";
import Text from "../../ui/Text/Text";

const NavigationWrapper = ({children}) => {
	return (
		<div
			className={s.wrapper__navigation}>
			<nav className={s.nav__content}>
				<div className={s.name__company}>
					<span>
						<img src={logo} alt='logo'/>
						<Text weight={'strong'} style={{paddingLeft:10}}>LOSTI-CHAT</Text>
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
