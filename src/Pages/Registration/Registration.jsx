import React from 'react';
import s from './Registration.module.scss';
import {Route, Routes, useLocation} from "react-router-dom";
import logo from "../../components/assets/logo.svg";

import RegistrationFormStep1 from "../../components/RegistrationForm/RegistrationFormStep1";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import RegistrationFormStep2 from "../../components/RegistrationFormStep2/RegistrationFormStep2";
import RegistrationFormStep3 from "../../components/RegistrationFormStep3/RegistrationFormStep3";
import RegistrationFormStep4 from "../../components/RegistrationFormStep4/RegistrationFormStep4";


const Registration = () => {
	const location = useLocation()
	
	return (
		<FormWrapper>
			{location.pathname !== '/registration/about-user'
				&& location.pathname !== '/registration/password'
				&& location.pathname !== '/registration/confirmation-code' &&
				
				<div className={s.form__title}>
				
				<img src={logo} alt='logo'/>
				
				
				<span>Регистрация в LOSTI-CHAT</span>
			
			</div>}
			
			<div className={s.wrapper__steps}>
				{
					location.pathname !== '/registration/about-user'
					&& location.pathname !== '/registration/password'
					&& location.pathname !== '/registration/confirmation-code' &&
					<h3>Ваша почта будет использована <br/> для входа в аккаунт</h3>}
				{
					location.pathname === '/registration/about-user'
					&& location.pathname !== '/registration/password'
					&& location.pathname !== '/registration/confirmation-code' ?
						<h3>Информация о вас</h3> : ''}
				{
					location.pathname === '/registration/password' &&
					<h3 style={{marginTop: 40}}>Ваш пароль будет использован <br/> для входа в аккаунт</h3>}
				{
					location.pathname === '/registration/confirmation-code' &&
					<h3 style={{marginTop: 40}}>Введите код подтверждения</h3>}
				
				{location.pathname !== '/registration/about-user'
					&& location.pathname !== '/registration/password'
					&& location.pathname !== '/registration/confirmation-code'
					&& <RegistrationFormStep1/>}
				
				<Routes>
					<Route path='about-user' element={<RegistrationFormStep2/>}/>
					<Route path='password' element={<RegistrationFormStep3/>}/>
					<Route path='confirmation-code' element={<RegistrationFormStep4/>}/>
				</Routes>
			
			</div>
		</FormWrapper>
	);
};

export default Registration;
