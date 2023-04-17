import React from 'react';
import s from './WrapperMessage.module.scss'
import {convertTime} from "../../actions/convertTime";

const WrapperMessage = ({time, children, pos}) => {
	const position = {
		borderRadius: pos === 'left' ? '14px 14px 14px 4px' : '14px 14px 4px 14px'
	}

	return (
		<div className={s.wrapper__message} style={pos ? position : {}}>
			{children}
			<div className={s.message__time}>
				{convertTime(time)}
			</div>
		</div>
	);
};

export default WrapperMessage;
