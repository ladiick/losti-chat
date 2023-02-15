import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HOST } from '../api/HOST'
import s from './RegistrationForm.module.scss'

const RegistrationForm = () => {
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	})
	const onSubmit = async data => {
		console.log(data);
		const newDate = new Date(data.birth_date)
		const years = newDate.getFullYear()
		const month = newDate.getMonth() + 1
		const day = newDate.getDay()

		data.birth_date = `${years}-${month}-${day}`
		await axios.post(`http://${HOST}/api/v1/auth/users/`, data)

		window.location.href = '/authorization'
	}

	return (
		<div className={s.form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={s.label__inputs}>
					{errors?.first_name ? (
						<div className={s.error__send}>{errors.first_name.message}</div>
					) : (
						'Ваше имя'
					)}
					<input
						className={s.input}
						type='text'
						placeholder='Имя'
						style={errors?.first_name && { borderColor: 'red' }}
						{...register('first_name', {
							required: 'Необходимо заполнить',
				
						})}
					/>
				</label>

				<label className={s.label__inputs}>
					{errors?.last_name ? (
						<div className={s.error__send}>{errors.last_name.message}</div>
					) : (
						'Ваша фамилия'
					)}
					<input
						className={s.input}
						type='text'
						placeholder='Фамилия'
						style={errors?.last_name && { borderColor: 'red' }}
						{...register('last_name', {
							required: 'Необходимо заполнить',
						})}
					/>
				</label>

				<label className={s.label__inputs}>
					{errors?.email ? (
						<div className={s.error__send}>{errors.email.message}</div>
					) : (
						'Электронная почта'
					)}
					<input
						className={s.input}
						type='email'
						placeholder='Почта'
						style={errors?.email && { borderColor: 'red' }}
						{...register('email', {
							required: 'Необходимо заполнить',
							pattern: {
								value:
									/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
								message: 'Введите корректный email адрес',
							},
						})}
					/>
				</label>

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
						style={errors?.password && { borderColor: 'red' }}
						{...register('password', {
							required: 'Необходимо заполнить',
							minLength: {
								value: 5,
								message: 'Пароль менее 5 символов',
							},
						})}
					/>
				</label>
				<div className={s.date__gender}>
					<label className={s.label__inputs}>
						{errors?.birth_date ? (
							<div className={s.error__send}>{errors.birth_date.message}</div>
						) : (
							'Дата рождения'
						)}

						<input
							className={s.input}
							type='date'
							style={errors?.birth_date && { borderColor: 'red' }}
							{...register('birth_date', {
								required: 'Необходимо заполнить',
								min: {
									value: 1970,
									message: 'Дата рождения некорректна',
								},
								max: {
									value: new Date(),
									message: 'Выбранная дата превышает реальную',
								},
								valueAsDate: true,
							})}
						/>
					</label>
					<div className={s.gender__buttons}>
						<label className={s.label__radios} htmlFor='male'>
							<input
								id='male'
								className={s.input__radio}
								type='radio'
								value='m'
								style={errors?.gender && { borderColor: 'red' }}
								{...register('gender', {
									required: 'Необходимо заполнить',
								})}
							/>

							<span style={errors?.gender && { borderColor: 'red' }}>
								Мужчина
							</span>
						</label>

						<label className={s.label__radios} htmlFor='female'>
							<input
								id='female'
								className={s.input__radio}
								type='radio'
								value='f'
								{...register('gender', {
									required: 'Необходимо заполнить',
								})}
							/>
							<span style={errors?.gender && { borderColor: 'red' }}>
								Женщина
							</span>
						</label>
					</div>
				</div>

				<button className={s.btn_submit} disabled={!isValid}>
					Зарегистрироваться
				</button>
				<span className={s.btn__desc}>
					Уже зарегистрированы?
					<Link to='/'>Водите здесь.</Link>
				</span>
			</form>
		</div>
	)
}

export default RegistrationForm
