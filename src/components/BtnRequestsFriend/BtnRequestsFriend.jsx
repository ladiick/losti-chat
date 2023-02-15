import React from 'react';
import s from "./BtnRequestsFriend.module.scss";

const BtnRequestsFriend = ({handlerCurrentRequest}) => {
	return (
		<div className={s.btn__requests} onClick={handlerCurrentRequest}>
			<button className={s.btn__accept}>Принять</button>
			<button className={s.btn__cancel}>Отклонить</button>
		</div>
	);
};

export default BtnRequestsFriend;
