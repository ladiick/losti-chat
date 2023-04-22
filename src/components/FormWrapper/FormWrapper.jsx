import React from 'react';
import s from './FormWrapper.module.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";
import WrapperBlocks from "../ui/WrapperBlocks/WrapperBlocks";
import Text from '../ui/Text/Text'
import {FiArrowLeft} from "react-icons/fi";

const FormWrapper = ({children}) => {
	const location = useLocation()
	const navigate = useNavigate()

	return (
		<div className={s.wrapper}>
			<WrapperBlocks className={s.wrapper__content}>
				{
					location.pathname !== '/registration' &&
					location.pathname !== '/authorization' &&
					<Text className={s.arrow__back} onClick={() => navigate(-1)}>
						<FiArrowLeft size={16}/>
						Назад
					</Text>
				}
				{children}
			</WrapperBlocks>
		</div>
	);
};

export default FormWrapper;
