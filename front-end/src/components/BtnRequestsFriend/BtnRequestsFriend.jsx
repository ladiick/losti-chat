import React from 'react';
import s from "./BtnRequestsFriend.module.scss";

const BtnRequestsFriend = ({handlerCancel,handlerAccept}) => {
	
	
	
	
	return (
		<div className={s.btn__requests}>
			<button className={s.btn__accept} onClick={handlerAccept}>Принять заявку</button>
			<button className={s.btn__cancel} onClick={handlerCancel}>Отклонить</button>
		</div>
	);
};

export default BtnRequestsFriend;
