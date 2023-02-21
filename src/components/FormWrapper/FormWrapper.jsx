import React from 'react';
import s from './FormWrapper.module.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";

const FormWrapper = ({children}) => {
	const location = useLocation()
	const navigate = useNavigate()
	
	return (
		<div className={s.wrapper}>
			<div className={s.wrapper__content}>
				<div className={s.wrapper__form}>
					{
						location.pathname !== '/registration' &&
						location.pathname !== '/authorization' &&
						<div className={s.arrow__back} onClick={() => navigate(-1)}>
							
							<svg height="24px" version="1.1" viewBox="0 0 512 512" width="24px">
								<polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "/>
							</svg>
							<span>
					Назад
						</span>
						
						</div>}
					{children}
				</div>
			</div>
		</div>
	);
};

export default FormWrapper;
