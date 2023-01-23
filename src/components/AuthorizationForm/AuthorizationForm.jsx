import s from './AuthorizationForm.module.scss'
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import React from "react";

const AuthorizationForm = () => {
	const {register, handleSubmit, formState: {errors, isValid}} = useForm(
		{
			mode: 'onChange'
		}
	)
	
	const onSubmit = (data) => {
	
	
	}
	
	return (
		
		<div className={s.form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={s.label__inputs}>
					{errors?.email ? <div className={s.error__send}>{errors.email.message}</div> : 'Электронная почта'}
					
					<input
						className={s.input__email}
						type='text'
						placeholder='Email'
						style={errors?.email && {borderColor:'red'}}
						{...(register('email', {
							required: 'Необходимо заполнить',
							pattern: {
								value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
								message: "Введите корректный email адрес"
							}
						}))}
					
					/>
					{/*{errors?.email && <div className={s.error__send}>{errors.email.message}</div>}*/}
				</label>
				
				
				<label className={s.label__inputs}>
					<div className={s.fogot__password}>
						{errors?.password ? <div className={s.error__send}>{errors.password.message}</div> : 'Пароль'}
						<Link to='/'>Забыли пароль?</Link>
					
					</div>
					
					<input
						className={s.input__password}
						type='password'
						placeholder='Password'
						style={errors?.password && {borderColor:'red'}}
						{...(register('password', {
							required: 'Необходимо заполнить',
							minLength: {
								value: 5,
								message: 'Пароль менее 5 символов'
							}
						}))}
					
					/>
					
				</label>
				
				<button className={s.btn_submit} disabled={!isValid}>Авторизоваться</button>
				<span className={s.btn__desc}>У вас нет аккаунта?
					<Link to='/'>Зарегистрируйтесь здесь.</Link></span>
			
			</form>
		</div>
	
	)
	
	
}

export default AuthorizationForm