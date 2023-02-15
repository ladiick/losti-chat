import React from 'react';
import btn from '../assets/btnAddFriend.svg'
import s from './BtnAddFriend.module.scss'

const BtnAddFriend = ({handlerPeople}) => {
	
	return (
		<div className={s.btn__wrapper} onClick={handlerPeople}>
			<img src={btn} alt=""/>
		</div>
	);
};

export default BtnAddFriend;
