import React, {useEffect, useState} from 'react';
import s from './AllPeople.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
	findPeople, setAddFriend,
	setCurrentPeopleAll,
} from "../../redux/slices/peopleSlice";
import AllPeopleItem from "../AllPeopleItem/AllPeopleItem";
import axios from "axios";
import {HOST} from "../api/HOST";
import searchFriends from "../SearchFriends/SearchFriends";

const AllPeople = () => {
	// const people = useSelector(state => state.people.peopleAll)
	
	
	const [alert, setAlert] = useState(false);
	
	const dispatch = useDispatch()
	

	
	return (
		<div className={s.wrapper}>
			
			<div className={alert ? s.alert__active : s.alert}>
				Заявка отправлена
			</div>
			
			
			{/*<div className={s.block__people}>*/}
			{/*		*/}
			{/*		{people?.map((obj, index) =>*/}
			{/*			<AllPeopleItem*/}
			{/*				key={obj.pk}*/}
			{/*				obj={obj}*/}
			{/*				handlerPeople={() => handlerPeople(index, obj)}*/}
			{/*			/>*/}
			{/*		)}*/}
			{/*</div>*/}
			
			{/*<div*/}
			{/*	className={s.btn__allpeople}*/}
			{/*	onClick={()=>dispatch(searchFriends(true))}>*/}
			{/*	Показать всех*/}
			{/*</div>*/}
		
		</div>
	);
};

export default AllPeople;
