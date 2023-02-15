import React, {useEffect} from 'react';
import btn from '../assets/btnAddFriend.svg'
import s from './BtnAddFriend.module.scss'
import axios from "axios";
import {HOST} from "../api/HOST";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPeopleAll} from "../../redux/slices/peopleSlice";
const BtnAddFriend = () => {
	const peopleCurrent = useSelector(state => state.people.peopleCurrentAll)
	const userAccessToken = useSelector(state => state.user.tokens.access)
	const dispatch = useDispatch()
	
	
	
	const handlerSubmit = ()=>{
		if(peopleCurrent.pk) {
			axios.post(`http://${HOST}/api/v1/friends/`, {
					second_user: peopleCurrent.pk
				},
				{
					headers: {Authorization: `JWT ${userAccessToken}`},
				}).then(res => dispatch(setCurrentPeopleAll({})))
			
		}
		
	}
	
	return (
		<div className={s.btn__wrapper} onClick={handlerSubmit}>
			<img src={btn} alt=""/>
		</div>
	);
};

export default BtnAddFriend;
