import s from './AuthorizationForm.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import React from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setIsAuth, setUserAccessToken, setUserRefreshToken} from "../../redux/slices/userSlice";
const AuthorizationForm = () => {
	const dispatch = useDispatch()
	const {register, handleSubmit, formState: {errors, isValid}} = useForm(
		{
			mode: 'onChange'
		}
	)
	
	const navigation = useNavigate()
	const onSubmit = async (data) => {
		
		
		await axios.post('http://127.0.0.1:8000/api/v1/token/', {
			email: data.email,
			password: data.password,
		})
			.then(res => {
				localStorage.setItem('accessToken',res.data.access)
				localStorage.setItem('refreshToken',res.data.refresh)
				dispatch(setUserAccessToken(res.data.access))
				dispatch(setUserRefreshToken(res.data.refresh))
				
				dispatch(setIsAuth(true))
				navigation('/')
			})
			.catch(err => console.log(err.response))
	
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
					<Link to='/registration'>Зарегистрируйтесь здесь.</Link></span>
			
			</form>
		</div>
	
	)
	
	
}

export default AuthorizationForm