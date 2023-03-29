import React from 'react';
import s from './BtnAddFriend.module.scss'
import {AiOutlineUserAdd} from "react-icons/ai";

const BtnAddFriend = ({handlerPeople}) => {
	
	return (
		<div className={s.btn__wrapper} onClick={handlerPeople}>
			<AiOutlineUserAdd/>
		</div>
	);
};

export default BtnAddFriend;
