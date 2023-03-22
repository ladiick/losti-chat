import React from 'react';
import s from "./RegistrationFormStepInfoUser.module.scss";

const RegistrationFormStepInfoUser = ({errors,register}) => {


	return (
		
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
					<div className={s.wrapper__gender}>
						<span className={s.wrapper__gender_title}>Пол</span>
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
				
				</div>
				
			
	);
};

export default RegistrationFormStepInfoUser;
