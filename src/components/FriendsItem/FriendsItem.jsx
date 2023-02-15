import React from 'react';
import photo from "../assets/my_photo.jpg";
import s from './FriendsItem.module.scss'
import {openModalBlock} from "../../redux/slices/navigationSlice";
import {useDispatch} from "react-redux";
import BtnRequestsFriend from "../BtnRequestsFriend/BtnRequestsFriend";

const FriendsItem = ({obj,requests,handlerCancel,handlerAccept}) => {
	const dispatch = useDispatch()
	
	return (
		<div className={s.wrapper__item}>
			<img src={photo} alt="avatar"/>
			<div className={s.info__user}>
				<h1>{obj.friend.first_name} {obj.friend.last_name}</h1>
				
				{requests !== 'requests' ? <span
					className={s.writeAMessage}
					onClick={() => dispatch(openModalBlock(true))}>Написать сообщение</span>
				
					:
					<BtnRequestsFriend handlerCancel={handlerCancel} handlerAccept={handlerAccept}/>
					
				}
			</div>
		</div>
	);
};

export default FriendsItem;
