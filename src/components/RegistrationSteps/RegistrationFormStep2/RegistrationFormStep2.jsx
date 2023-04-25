import React, {useEffect, useState} from 'react';
import {PinInput} from 'react-input-pin-code';
import s from './RegistrationFormStep2.module.scss'
import axios from "axios";
import {HOST} from "../../api/HOST";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setRegistrationSteps} from "../../../redux/slices/registrationStepsSlice";
import Text from "../../ui/Text/Text";
import ActionButton from "../../ui/ActionButton/ActionButton";

const RegistrationFormStep2 = () => {
	const [values, setValues] = useState(['', '', '', '', '', '']);
	const [errors, setErrors] = useState('')
	const [btnDisable, setBtnDisable] = useState(false);
	const stepsInfo = useSelector(state => state.registration.stepsInfo)
	const [codeError, setCodeError] = useState('');
	const navigate = useNavigate()
	const dispatch = useDispatch()


	useEffect(() => {
		if (!localStorage.getItem('email')) {
			navigate('/registration')
		}
	}, [])


	useEffect(() => {
		const val = values.join('')
		if (val.length === 6) {
			setBtnDisable(true)
		} else {
			setBtnDisable(false)
		}
	}, [values, btnDisable]);
	
	const onSubmit = async (e) => {
		e.preventDefault()
		const code = values.join('')
		localStorage.setItem('code',code)
		if (!code.length) {
			setErrors('Пин-код пуст')
			return
		}
		try {
			const res = await axios
				.get(`${HOST}/api/v1/auth/users/check_code/?code=${code}&email=${localStorage.getItem('email')}`)
			dispatch(setRegistrationSteps({code}))
			navigate('/registration/password')
			
		} catch (err) {
			if (err.response.data.type === 3) {
				setValues(['', '', '', '', '', ''])
				setCodeError('Код введен неверно')
			}
		}
		
		
	}
	
	return (
		<>
			
			<div className={s.form} onSubmit={onSubmit}>
				<form noValidate>
					
					<div className={s.wrapper__inputs}>
							<Text className={codeError ? s.error__send : s.description__title} >
								{codeError ?
									codeError :
									`На ${localStorage.getItem('email')} отправлен код активации`}
							</Text>
							{errors}
							<PinInput
								size='sm'
								autoFocus={true}
								values={values}
								autoTab={true}
								borderColor={'#434343'}
								errorBorderColor='red'
								focusBorderColor='#1a73e8'
								inputStyle={{color: 'var(--color--text--main)'}}
								placeholder='●'
								validBorderColor={'#4bb24b'}
								aria-label={codeError}
								required={true}
								onBlur={()=>{setCodeError('')}}
								onChange={(value, index, values) => setValues(values)}

							
							/>
					</div>
					
					<ActionButton disabled={!btnDisable}>Продолжить</ActionButton>
				</form>
			</div>
		</>
	);
};

export default RegistrationFormStep2;
