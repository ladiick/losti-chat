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
			{/*<div className={s.arrow__back}>*/}
			{/*	<Link to='/'>*/}
			{/*		<svg fill='white' height="24px" version="1.1" viewBox="0 0 512 512" width="24px">*/}
			{/*			<polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "/>*/}
			{/*		</svg>*/}
			{/*		*/}
			{/*		<span>*/}
			{/*		Назад*/}
			{/*			</span>*/}
			{/*	</Link>*/}
			{/*</div>*/}
			<div className={s.form__title}>
				<img src={logo} alt='logo'/>
				
				<span>Вход в LOSTI-CHAT</span>
			
			</div>
			<AuthorizationForm/>
		</FormWrapper>
	
	)
}


export default Authorization