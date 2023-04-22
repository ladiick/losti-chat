import React, {useEffect} from 'react';
import s from './RegistrationFormStep3.module.scss'
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {setRegistrationSteps} from "../../../redux/slices/registrationStepsSlice";
import {useDispatch, useSelector} from "react-redux";
import Text from '../../ui/Text/Text'
import FormWrapperLabel from "../../FormWrapper/FormWrapperLabel/FormWrapperLabel";
import ActionInput from "../../ui/ActionInput/ActionInput";
import ActionButton from "../../ui/ActionButton/ActionButton";
import {BsCalendarDate} from "react-icons/bs";

const RegistrationFormStep3 = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const stepsInfo = useSelector(state => state.registration.stepsInfo)

	useEffect(() => {
		if (!localStorage.getItem('email')) {
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
		delete data.password_repeat
		localStorage.setItem('password', data.password)
		dispatch(setRegistrationSteps(data))
		navigate('/registration/about-user')
	}

	return (
		<>

			<div className={s.form}>
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<div className={s.wrapper__form}>
						<Text style={{textAlign: 'center'}}>
							Ваш пароль будет использован <br/> для входа в аккаунт
						</Text>
						<div>
							<FormWrapperLabel
								title='Пароль'
								errors={errors?.password}
							>
								<ActionInput
									type='password'
									placeholder='Введите больше 5 символов'
									style={errors?.password ? {borderColor: 'red', marginTop: 8} : {marginTop: 8}}
									{...register('password', {
										required: 'Необходимо заполнить',
										minLength: {
											value: 5,
											message: 'Пароль менее 5 символов',
										},
									})}
								/>
							</FormWrapperLabel>
							<FormWrapperLabel
								errors={errors?.password_repeat}
								title='Подтвердите пароль'
							>
								<ActionInput

									type='password'
									placeholder='Подтвердить'
									style={errors?.password_repeat
										? {borderColor: 'red', marginTop: 8}
										: {marginTop: 8}}
									{...register('password_repeat', {
										required: 'Пароли не совпадают',
										validate: (val) => {
											if (watch('password') !== val) {
												return "Пароли не совпадают";
											}
										},
									})}
								/>
							</FormWrapperLabel>
						</div>
					</div>
					<div>
						<ActionButton
							style={{display: 'block', width: '100%'}}
							disabled={!isValid}>
							Продолжить
						</ActionButton>
					</div>
				</form>
			</div>
		</>
	);
};

export default RegistrationFormStep3;
