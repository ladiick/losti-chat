import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {Link, redirect, useNavigate} from 'react-router-dom'
import {HOST} from '../../api/HOST'
import s from './RegistrationFormStep1.module.scss'
import {setRegistrationSteps} from "../../../redux/slices/registrationStepsSlice";
import logo from "../../assets/logo.svg";
import NameCompany from "../../NameCompany/NameCompany";
import Text from '../../ui/Text/Text'
import FormWrapperLabel from "../../FormWrapper/FormWrapperLabel/FormWrapperLabel";
import ActionInput from "../../ui/ActionInput/ActionInput";
import ActionButton from "../../ui/ActionButton/ActionButton";
import {VALID__EMAIL} from "../../../utils/validateForm";

const RegistrationFormStep1 = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const stepsInfo = useSelector(state => state.registration.stepsInfo)

	const {
		register,
		handleSubmit,
		setError,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		defaultValues: {email: localStorage.getItem('email')}
	})

	const onSubmit = async (data) => {

		const res = await axios
			.get(`${HOST}/api/v1/auth/users/check_mail/?email=${data.email}`)

		if (res.data === false) {
			await axios.post(`${HOST}/api/v1/auth/code/`, {
				email: data.email
			})
			localStorage.setItem('email', data.email)
			dispatch(setRegistrationSteps(data))
			navigate('/registration/confirmation-code')
		}

		if (res.data === true) {
			setError('email', {
				message: 'Такая почта уже зарегистрирована'
			})
		}

	}

	return (
		<>
			<NameCompany
				size={36}
				title='Регистрация в LOSTI-CHAT'
				direction='column'/>

			<Text
				style={
					{
						textAlign: 'center',
						marginTop: 10
					}
				}>Ваша почта будет использована <br/> для входа в аккаунт</Text>
			<div className={s.form}>
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<div className={s.wrapper__form}>
						<FormWrapperLabel
							title='Электронная почта'
							errors={errors?.email}>

							<ActionInput
								type='email'
								placeholder='example@gmail.com'
								style={errors?.email ? {borderColor: 'red', marginTop: 8} : {marginTop: 8}}
								{...register('email', {
									required: 'Необходимо заполнить',
									pattern: {
										value: VALID__EMAIL,
										message: 'Введите корректный email адрес',
									},
								})}
							/>

						</FormWrapperLabel>

					</div>
					<div>
						<ActionButton
							style={{display: 'block', width: '100%'}}
							disabled={!isValid}>Продолжить</ActionButton>

						<Text className={s.orLogin}>или</Text>

						<ActionButton
							onClick={() => navigate('/authorization')}
							className={s.btn__registr}>
							Войти
						</ActionButton>
					</div>
				</form>
			</div>
		</>
	)
}

export default RegistrationFormStep1
