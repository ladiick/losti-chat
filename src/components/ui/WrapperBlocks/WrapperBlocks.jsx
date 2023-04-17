import React from 'react';
import s from './WrapperBlocks.module.scss'
const WrapperBlocks = ({children,className,...props}) => {

	const classGeneral = className ? `${className} ${s.wrapper}` : s.wrapper

	return (
		<div className={classGeneral} {...props}>
			{children}
		</div>
	);
};

export default WrapperBlocks;
