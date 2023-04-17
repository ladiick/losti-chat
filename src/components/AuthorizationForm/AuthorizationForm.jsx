import s from './AuthorizationForm.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import React from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setIsAuth, setUserAccessToken, setUserRefreshToken} from "../../redux/slices/userSlice";
import {HOST} from "../api/HOST";
import logo from "../assets/logo.svg";
import ActionButton from "../ui/ActionButton/ActionButton";


const AuthorizationForm = () => {
	const dispatch = useDispatch()

	const {register, setError, handleSubmit, reset, formState: {errors, isValid}} = useForm(
		{
			mode: 'onChange'
		}
	)


	const onSubmit = async (data) => {

		try {
			const res = await axios.post(`${HOST}/api/v1/token/`, {
				email: data.email,
				password: data.password,
			})

			localStorage.setItem('accessToken', res.data.access)
			localStorage.setItem('refreshToken', res.data.refresh)
			dispatch(setUserAccessToken(res.data.access))
			dispatch(setUserRefreshToken(res.data.refresh))
			dispatch(setIsAuth(true))
			window.location.href = '/'


		} catch (err) {
			if (err.response.status === 401) {
				reset()
				setError('email', {
					message: 'Неверный пароль или почта'
				})
				setError('password', {})
			}
		}
	}

	return (
		<>
			<div className={s.form__title}>
				<img src={logo} alt='logo'/>
				<span>Вход в LOSTI-CHAT</span>
			</div>

			<div className={s.form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={s.wrapper__form}>
						<label className={s.label__inputs}>
							{errors?.email ?
								<div className={s.error__send}>{errors.email.message}</div> : 'Электронная почта'}
							<input
								className={s.input}
								type='text'
								placeholder='Email'
								style={errors?.email && {borderColor: 'red'}}
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
								{errors?.password ?
									<span className={s.error__send}>{errors.password.message}</span> : 'Пароль'}
								<Link to='/'>Забыли пароль?</Link>

							</div>

							<input
								className={s.input}
								type='password'
								placeholder='Введите больше 5 символов'
								style={errors?.password && {borderColor: 'red'}}
								{...(register('password', {
									required: 'Необходимо заполнить',
									minLength: {
										value: 5,
										message: 'Пароль менее 5 символов'
									}
								}))}

							/>

						</label>
					</div>

					<div>
						<ActionButton
							style={{display: 'block', width: '100%'}}
							disabled={!isValid}>Войти</ActionButton>

						<div className={s.orLogin}>или</div>

						<Link to='/registration' className={s.btn__desc}>Зарегистрироваться</Link>
					</div>
				</form>

			</div>
		</>

	)


}

export default AuthorizationForm