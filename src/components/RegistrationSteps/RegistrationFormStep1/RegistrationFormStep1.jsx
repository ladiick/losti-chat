import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {Link, redirect, useNavigate} from 'react-router-dom'
import {HOST} from '../../api/HOST'
import s from './RegistrationFormStep1.module.scss'
import {setRegistrationSteps} from "../../../redux/slices/registrationStepsSlice";
import logo from "../../assets/logo.svg";

const RegistrationFormStep1 = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const stepsInfo = useSelector(state => state.registration.stepsInfo)
	const [emailExist, setEmailExist] = useState('');
	const [watchInput, setWatchInput] = useState('');
	
	const {
		register,
		handleSubmit,
		watch,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		defaultValues: {email: stepsInfo.email}
	})
	
	useEffect(() => {
		if (watch('email') !== watchInput) {
			setEmailExist('')
		}
	}, [watch('email')]);
	
	
	const onSubmit = async (data) => {
		dispatch(setRegistrationSteps(data))
		
		const res = await axios
			.get(`http://${HOST}/api/v1/auth/users/check_mail/?email=${data.email}`)
		
		if (res.data === false) {
			const res2 = await axios.post(`http://${HOST}/api/v1/auth/code/`, {
				email: data.email
			})
			console.log(res2)
			navigate('/registration/confirmation-code')
			
		}
		
		if (res.data === true) {
			setEmailExist('Такой email существует')
			setWatchInput(watch('email'))
		}
		
	}
	
	return (
		<>
			<div className={s.form__title}>
				<img src={logo} alt='logo'/>
				<span>Регистрация в LOSTI-CHAT</span>
			</div>
			
			<h3 className={s.description__title}>Ваша почта будет использована <br/> для входа в аккаунт</h3>
			<div className={s.form}>
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<div className={s.wrapper__form}>
					<label className={s.label__inputs}>
						{errors?.email ? (
							<div className={s.error__send}>{errors.email.message}</div>
						) : (
							'Электронная почта'
						)}
						<input
							className={s.input}
							type='email'
							placeholder='example@gmail.com'
							style={errors?.email || emailExist !== '' ? {borderColor: 'red'} : {}}
							// style={emailExist !== '' && {borderColor: 'red'}}
							
							{...register('email', {
								required: 'Необходимо заполнить',
								pattern: {
									value:
										/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
									message: 'Введите корректный email адрес',
								},
							})}
						/>
						<div className={s.error__send} style={{marginTop: 8}}>{emailExist}</div>
					</label>
					</div>
					<div>
						<button className={s.btn_submit} disabled={!isValid}>
							Продолжить
						</button>
						
						<div className={s.orLogin}>или</div>
						
						<Link to='/authorization' className={s.btn__desc}>Войти</Link>
					</div>
				</form>
			</div>
		</>
	)
}

export default RegistrationFormStep1
