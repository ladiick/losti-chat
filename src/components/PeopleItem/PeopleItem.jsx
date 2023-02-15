import s from "./PeopleItem.module.scss";
import photo from "../assets/my_photo.jpg";
import {useDispatch, useSelector} from "react-redux";
import {reTime} from "../actions/reTime";
import BtnAddFriend from "../BtnAddFriend/BtnAddFriend";
import btn from "../assets/btnAddFriend.svg";
import React from "react";
import axios from "axios";
import {HOST} from "../api/HOST";
import {setCurrentPeopleAll} from "../../redux/slices/peopleSlice";

const PeopleItem = ({firstName, lastName, message, time, img, id, friend, handlerPeople}) => {
	
	const peopleChecked = useSelector(state => state.people.peopleCurrent.pk)
	const peopleCheckedAll = useSelector(state => state.people.peopleCurrentAll.pk)
	
	
	return (
		<div className={s.main__wrapper}>
			<div
				onClick={friend !== 'friend' ? handlerPeople : ''}
				className={peopleChecked === id || peopleCheckedAll === id ? s.block__people__item__active : s.block__people__item}>
				<div className={s.info__message}>
					<img src={img ? img : photo} alt='avatar'/>
					<div className={s.name__lastMessage}>
						<h2>{firstName} {lastName}</h2>
						
						
						<p>{message}</p>
					
					
					</div>
					
					<div className={s.wrapper__time}>
						{
							friend !== 'friend' &&
							<p className={s.time}>{reTime(time, 'people')}</p>
							
						}
						{/*<span className={s.quantity__message}>2</span>*/}
						{friend !== 'friend' &&
							<span>1</span>}
					
					</div>
				
				
				</div>
			
			
			</div>
			{
				friend === 'friend' &&
				<div onClick={handlerPeople}>
				<BtnAddFriend/>
				</div>
			}
		</div>
	
	)
	
}

export default PeopleItem