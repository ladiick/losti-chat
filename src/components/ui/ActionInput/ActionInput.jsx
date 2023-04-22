import React from 'react';
import s from './ActionInput.module.scss'

const ActionInput = React.forwardRef((props, ref) => {

	return (
		<input {...props} ref={ref} className={s.action__input}/>
	);
});

export default ActionInput;
