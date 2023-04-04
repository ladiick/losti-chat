import React from 'react';
import s from './BtnAddFriend.module.scss'
import {AiOutlineUserAdd} from "react-icons/ai";

const BtnAddFriend = ({handlerPeople,style}) => {
	
	return (
		<div className={s.btn__wrapper}
			 style={style}
			 onClick={handlerPeople}
			 title='Добавить в друзья'>
			<AiOutlineUserAdd/>
		</div>
	);
};

export default BtnAddFriend;
