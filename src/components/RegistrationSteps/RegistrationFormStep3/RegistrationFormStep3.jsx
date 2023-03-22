import React, {useEffect} from 'react';
import s from './RegistrationFormStep3.module.scss'
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {setRegistrationSteps} from "../../../redux/slices/registrationStepsSlice";
import {useDispatch, useSelector} from "react-redux";

const RegistrationFormStep3 = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const stepsInfo = useSelector(state => state.registration.stepsInfo)

	useEffect(() => {
		if (localStorage.getItem('email') === "") {
			navigate('/registration')
		}
	}, [])
	
	const {
		register,
		watch,
		handleSubmit,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		defaultValues: {password: localStorage.getItem('password')}
	})
	
	
	const onSubmit = data => {
		console.log(data)
		delete data.password_repeat
		console.log(data)
		localStorage.setItem('password',data.password)
		dispatch(setRegistrationSteps(data))
		
		navigate('/registration/about-user')
	}
	
	return (
		<>
			
			<div className={s.form}>
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<div className={s.wrapper__form}>
						<h3 className={s.description__title}>Ваш пароль будет использован <br/> для входа в аккаунт</h3>
						<div>
						<label className={s.label__inputs}>
							{errors?.password ? (
								<div className={s.error__send}>{errors.password.message}</div>
							) : (
								'Пароль'
							)}
							<input
								className={s.input}
								type='password'
								placeholder='Введите больше 5 символов'
								style={errors?.password && {borderColor: 'red'}}
								{...register('password', {
									required: 'Необходимо заполнить',
									minLength: {
										value: 5,
										message: 'Пароль менее 5 символов',
									},
								})}
							/>
						</label>
						<label className={s.label__inputs}>
							{errors?.password_repeat ? (
								<div className={s.error__send}>{errors.password_repeat.message}</div>
							) : (
								'Подтвердите пароль'
							)}
							<input
								className={s.input}
								type='password'
								placeholder='Подтвердить'
								style={errors?.password_repeat && {borderColor: 'red'}}
								{...register('password_repeat', {
									required: 'Пароли не совпадают',
									validate: (val) => {
										if (watch('password') !== val) {
											return "Пароли не совпадают";
										}
									},
								})}
							/>
						</label>
						</div>
					</div>
					<div>
						<button className={s.btn_submit} disabled={!isValid}>
							Продолжить
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default RegistrationFormStep3;
