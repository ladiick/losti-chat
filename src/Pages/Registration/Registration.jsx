import React from 'react';
import s from './Registration.module.scss';
import {Link} from "react-router-dom";
import logo from "../../components/assets/logo.svg";
import imgLogin from "../Authorization/login_img3.jpg";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";


const Registration = () => {
	return (
		<div className={s.block__login}>
			<div className={s.wrapper__content}>
				<div className={s.arrow__back}>
					<Link to='/'>
						<svg height="24px" version="1.1" viewBox="0 0 512 512" width="24px">
							<polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "/>
						</svg>
						
						<span>
						Назад
							</span>
					</Link>
				</div>
				<div className={s.wrapper__form}>
					<div className={s.wrapper__text}>
						<h1 className={s.form__title}>
							<img src={logo} alt='logo'/>LOSTI-CHAT
						</h1>
						<span className={s.form__line}><div>Регистрация</div></span>
						<p className={s.form__description}>
							Зарегистрируйтесь и начните пользоваться
						</p>
					</div>
					
					<RegistrationForm/>
				
				
				</div>
				<div className={s.wrapper__img}>
					<img src={imgLogin} alt='pictures'/>
				</div>
			</div>
		
		
		</div>
	);
};

export default Registration;
