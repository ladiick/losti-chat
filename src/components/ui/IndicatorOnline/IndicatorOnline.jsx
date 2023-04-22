import React from 'react';
import s from './IndicatorOnline.module.scss'
const IndicatorOnline = ({sizeIndicator}) => {
	return (
		<span className={s.indicator} style={sizeIndicator}></span>
	);
};

export default IndicatorOnline;
