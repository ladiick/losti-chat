import React, {useEffect, useState} from 'react';
import s from "./RegistrationFormStep4.module.scss";
import {useForm} from "react-hook-form";
import camera from '../../assets/camera.svg'
import RegistrationFormStepInfoUser from "../RegistrationFormStepInfoUser/RegistrationFormStepInfoUser";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {HOST} from "../../api/HOST";
import {IoCloseOutline} from "react-icons/io5";
import {setIsAuth, setUserAccessToken, setUserRefreshToken} from "../../../redux/slices/userSlice";
import Text from "../../ui/Text/Text";
import FormWrapperLabel from "../../FormWrapper/FormWrapperLabel/FormWrapperLabel";
import ActionButton from "../../ui/ActionButton/ActionButton";
import ActionInput from "../../ui/ActionInput/ActionInput";
import {VALID__NAME} from "../../../utils/validateForm";
import CloseButton from "../../ui/CloseButton/CloseButton";

const styleCloseButton = {
	position: 'absolute',
	top: -8,
	left: 0
}
const RegistrationFormStep4 = () => {
	const navigate = useNavigate()
	const stepsInfo = useSelector(state => state.registration.stepsInfo)
	const dispatch = useDispatch()
	const [image, setImage] = useState("");

	useEffect(() => {
		if (!localStorage.getItem('password')) {
			navigate('/registration')
		}
	}, [])

	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
	})


	const onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			let file = event.target.files[0];
			reader.onloadend = () => {
				setImage({
					...image, imagePreview: reader.result, file: file
				});
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit = async data => {
		const newDate = new Date(data.birth_date)
		let generalData = {}

		data.birth_date = newDate.toLocaleDateString('ru')
			.split('.')
			.reverse()
			.join('-')

		if (image.file) {
			generalData = {
				...data,
				email: localStorage.getItem('email'),
				password: localStorage.getItem('password'),
				img: image.file
			}

		} else {
			generalData = {
				...data,
				email: localStorage.getItem('email'),
				password: localStorage.getItem('password'),
			}
		}


		try {
			await axios.post(`${HOST}/api/v1/auth/users/`, generalData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			const res = await axios.post(`${HOST}/api/v1/token/`, {
				email: localStorage.getItem('email'),
				password: localStorage.getItem('password'),
			})

			localStorage.clear()

			dispatch(setUserAccessToken(res.data.access))
			dispatch(setUserRefreshToken(res.data.refresh))
			dispatch(setIsAuth(true))

			localStorage.setItem('accessToken', res.data.access)
			localStorage.setItem('refreshToken', res.data.refresh)
			window.location.href = '/'


		} catch (err) {

		}

	}
	return (<>
		<div className={s.form}>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<div className={s.wrapper__form}>
					<Text style={{textAlign: 'center'}}>Информация о вас</Text>
					<div className={s.wrapper__info}>
						<label className={s.label__img}>
							<div
								className={s.wrapper__uploadImg}
								style={image ? {borderColor: '#1a73e8'} : {}}>
								{
									image ?
										<img className={s.image__upload}
										     src={image.imagePreview} alt="check"/>

										:
										<img src={camera} alt="camera"/>
								}
							</div>

							<input
								type='file'
								accept='image/*,.png,.jpg,'
								onChange={onImageChange}
							/>
						</label>

						{image ? <CloseButton style={styleCloseButton} onClick={() => setImage('')}/> : ''}


						<div className={s.field_names}>
							<FormWrapperLabel
								style={{marginBottom: 5}}
							>
								<ActionInput
									type='text'
									placeholder={errors?.first_name?.message
										? errors?.first_name?.message : 'Имя'}
									style={
										errors?.first_name && {borderColor: 'red'}
									}
									{...register('first_name', {
										required: 'Необходимо заполнить', pattern: {
											value: VALID__NAME, message: 'Имя содержит цифр'
										}
									})}
								/>

							</FormWrapperLabel>


							<FormWrapperLabel>
								<ActionInput
									type='text'
									placeholder={
										errors?.last_name?.message
											? errors?.last_name?.message
											: 'Фамилия'}
									style={errors?.last_name && {borderColor: 'red'}}
									{...register('last_name', {
										required: 'Необходимо заполнить', pattern: {
											value: VALID__NAME, message: 'Фамилия содержит цифр'
										}
									})}
								/>
							</FormWrapperLabel>


						</div>

					</div>

					<RegistrationFormStepInfoUser
						setValue={setValue}
						errors={errors}
						register={register}/>
				</div>
				<ActionButton disabled={!isValid}>
					Зарегистрироваться
				</ActionButton>

			</form>
		</div>
	</>);
};

export default RegistrationFormStep4;
