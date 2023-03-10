import React from 'react';
import s from './FriendsItem.module.scss'
import {openModalBlock} from "../../redux/slices/navigationSlice";
import {useDispatch} from "react-redux";
import BtnRequestsFriend from "../BtnRequestsFriend/BtnRequestsFriend";
import {setFriendsCurrent} from "../../redux/slices/friendsSlice";
import {changeColor} from "../actions/changeColor";
import {HOST} from "../api/HOST";
import {useLocation} from "react-router-dom";



const FriendsItem = ({obj,index, requests, handlerCancel, handlerAccept}) => {
	
	const location = useLocation()
	console.log(location.pathname)
	const dispatch = useDispatch()
	return (
		<div className={s.wrapper__item}>
			{!!obj.friend.image ? <img src={`${HOST+obj.friend.image}`} alt="avatar"/>
				:
				<span className={s.empty__img} style={{backgroundColor: changeColor(index)}}
				>{obj.friend?.first_name[0]}{obj.friend?.last_name[0]}</span>
			}
			<div className={s.info__user}>
				<h1>{obj.friend.first_name} {obj.friend.last_name}</h1>
				
				{requests !== 'requests' ? <span
						className={s.writeAMessage}
						onClick={() => {
							dispatch(openModalBlock(true))
							dispatch(setFriendsCurrent(obj))
						}}>Написать сообщение</span>
					
					:
					<BtnRequestsFriend handlerCancel={handlerCancel} handlerAccept={handlerAccept}/>
					
				}
			</div>
		</div>
	);
};

export default FriendsItem;
