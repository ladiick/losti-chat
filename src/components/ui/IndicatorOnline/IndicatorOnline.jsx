import React from 'react';
import s from './IndicatorOnline.module.scss'
const IndicatorOnline = ({ size }) => {
	
	const sizeIcon = {
		width: size,
		height: size,
	}

	return <span className={s.indicator} style={sizeIcon}></span>;
};

export default IndicatorOnline;
