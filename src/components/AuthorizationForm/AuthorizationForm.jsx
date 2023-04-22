import s from './AuthorizationForm.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import React from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setIsAuth, setUserAccessToken, setUserRefreshToken} from "../../redux/slices/userSlice";
import {HOST} from "../api/HOST";
import ActionButton from "../ui/ActionButton/ActionButton";
import NameCompany from "../NameCompany/NameCompany";
import Text from '../ui/Text/Text'
import {VALID__EMAIL} from "../../utils/validateForm";
import ActionInput from "../ui/ActionInput/ActionInput";
import FormWrapperLabel from "../FormWrapper/FormWrapperLabel/FormWrapperLabel";

const AuthorizationForm = () => {
	const dispatch = useDispatch()
	const navigation = useNavigate()
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
					message: 'Неверная почта или пароль'
				})
				setError('password', {})
			}
		}
	}

	return (
		<>

			<NameCompany
				size={36}
				title='Вход в LOSTI-CHAT'
				direction='column'/>

			<div className={s.form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={s.wrapper__form}>
						<FormWrapperLabel
							errors={errors?.email}
							title='Электронная почта'>
							<ActionInput
								type='text'
								placeholder='Email'
								style={errors?.email ? {borderColor: 'red', marginTop: 8} : {marginTop: 8}}
								{...(register('email', {
									required: 'Необходимо заполнить',
									pattern: {
										value: VALID__EMAIL,
										message: "Введите корректный email адрес"
									}
								}))}/>

						</FormWrapperLabel>

						<FormWrapperLabel
							title={'Пароль'}
							errors={errors?.password}
							descriptionTitle={<Text type='button'>Забыли пароль?</Text>}>

							<ActionInput
								type='password'
								placeholder='Введите больше 5 символов'
								style={errors?.password ? {borderColor: 'red', marginTop: 8} : {marginTop: 8}}
								{...(register('password', {
									required: 'Необходимо заполнить',
									minLength: {
										value: 5,
										message: 'Пароль менее 5 символов'
									}
								}))}

							/>

						</FormWrapperLabel>

					</div>

					<div>
						<ActionButton
							style={{display: 'block', width: '100%'}}
							disabled={!isValid}>Войти</ActionButton>

						<Text className={s.orLogin}>или</Text>

						<ActionButton
							onClick={() => navigation('/registration')}
							className={s.btn__registr}>
							Зарегистрироваться
						</ActionButton>

					</div>
				</form>

			</div>
		</>

	)


}

export default AuthorizationForm