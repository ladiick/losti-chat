import s from './Authorization.module.scss'
// import imgLogin from './login_img3.jpg'
import imgLogin from './20943566.jpg'
import logo from '../../components/assets/logo.svg'
import AuthorizationForm from "../../components/AuthorizationForm/AuthorizationForm";
import {Link} from "react-router-dom";
import React from "react";
import FormWrapper from "../../components/FormWrapper/FormWrapper";

const Authorization = () => {
	
	return (
		
		<FormWrapper>
			<div className={s.form__title}>
				<img src={logo} alt='logo'/>
				<span>Вход в LOSTI-CHAT</span>
			</div>
			<AuthorizationForm/>
		</FormWrapper>
	
	)
}


export default Authorization