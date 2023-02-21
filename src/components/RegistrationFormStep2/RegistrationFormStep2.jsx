import React, {useEffect, useState} from 'react';
import s from "./RegistrationFormStep2.module.scss";
import {useForm} from "react-hook-form";
import camera from '../assets/camera.svg'
import RegistrationFormStepInfoUser from "../RegistrationFormStepInfoUser/RegistrationFormStepInfoUser";
import check from '../assets/check_mark.svg'
import {useDispatch, useSelector} from "react-redux";
import {redirect, useNavigate} from "react-router-dom";
import {setRegistrationSteps} from "../../redux/slices/registrationStepsSlice";
import axios from "axios";
import {HOST} from "../api/HOST";

const RegistrationFormStep2 = () => {
	const navigate = useNavigate()
	const stepsInfo = useSelector(state => state.registration.stepsInfo)
	const dispatch = useDispatch()
	
	useEffect(() => {
		if (stepsInfo.password === "") {
			navigate('/registration')
		}
	}, [])
	
	const {
		register,
		handleSubmit,
		watch,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
	})
	
	
	const onSubmit = async data => {
		if(data.img.length === 0){
			delete data.img
		}
		const newDate = new Date(data.birth_date)
		const years = newDate.getFullYear()
		const month = newDate.getMonth() + 1
		const day = newDate.getDate()
		data.birth_date = `${years}-${month}-${day}`
		
		const generalData = {
			...data,
			...stepsInfo
		}
		console.log('generalData',generalData)
		
		await axios.post(`http://${HOST}/api/v1/auth/users/`, generalData)
		
		
		// navigate('/authorization')
	}
	console.log(watch('img'))
	return (
		<>
			
			<div className={s.form}>
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<div className={s.wrapper__info}>
						<label className={s.label__img}>
							<span style={watch('img')?.length  ? {borderColor: '#4bb24b'} : null}>
								{
									watch('img')?.length ? <img src={check} alt="check"/> : <img src={camera} alt="camera"/>
								}
								
								
								
							</span>
							<input
								type='file'
								{...register('img')}
							/>
						</label>
						
						<div className={s.field_names}>
							<label className={s.label__inputs}>
								{errors?.first_name ? (
									<div className={s.error__send}>{errors.first_name.message}</div>
								) :
								errors?.last_name ? (
									<div className={s.error__send}>{errors.last_name.message}</div>
								) :
									''
								}
								<input
									className={s.input__first}
									type='text'
									placeholder='Имя'
									style={errors?.first_name && {borderColor: 'red'}}
									{...register('first_name', {
										required: 'Необходимо заполнить',
										pattern: {
											value: /^([^0-9]*)$/,
											message: 'Имя содержит цифр'
										}
										
									})}
								/>
							</label>
							
							<label className={s.label__inputs}>
								{/*{errors?.last_name ? (*/}
								{/*	<div className={s.error__send}>{errors.last_name.message}</div>*/}
								{/*) : (*/}
								{/*	''*/}
								{/*)}*/}
								<input
									className={s.input__last}
									type='text'
									placeholder='Фамилия'
									style={errors?.last_name && {borderColor: 'red'}}
									{...register('last_name', {
										required: 'Необходимо заполнить',
										pattern: {
											value: /^([^0-9]*)$/,
											message: 'Фамилия содержит цифр'
										}
									})}
								/>
							</label>
						
						
						</div>
					
					</div>
					
					<RegistrationFormStepInfoUser errors={errors} register={register}/>
					<button className={s.btn_submit} disabled={!isValid}>
						Зарегистрироваться
					</button>
				
				</form>
			</div>
		</>
	);
};

export default RegistrationFormStep2;
