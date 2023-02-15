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

const AllPeople = () => {
	const people = useSelector(state => state.people.peopleAll)
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
	const isAuth = useSelector(state => state.user.isAuth)
	const myId = useSelector(state => state.user.aboutUser.id)
	
	const [alert, setAlert] = useState(false);
	
	const dispatch = useDispatch()
	
	useEffect(() => {
		if (isAuth && userAccessToken) {
			dispatch(findPeople({userAccessToken, userRefreshToken}))
		}
		return () => {
			dispatch(setCurrentPeopleAll({}))
			
		}
	}, [isAuth, userAccessToken]);
	
	const handlerPeople = (index, obj) => {
		axios.post(`http://${HOST}/api/v1/friends/`, {
				second_user: obj.pk
			},
			{
				headers: {Authorization: `JWT ${userAccessToken}`},
			}).then(res => {
			dispatch(setAddFriend(index))
			notification()
		})
	}
	
	const notification = ()=>{
		setAlert(true)
	
		setTimeout(()=>{
			setAlert(false)
		},3000)
	}
	
	
	return (
		<div className={s.wrapper}>
			<div className={alert ? s.alert__active : s.alert}>
				Заявка отправлена
			</div>
			<h1 className={s.title__block}>Возможные друзья</h1>
			
			
			<div className={s.block__people}>
				<div className={s.wrapper__items}>
					
					{people?.map((obj, index) =>
						<AllPeopleItem
							key={obj.pk}
							obj={obj}
							handlerPeople={() => handlerPeople(index, obj)}
						/>
					)}
				</div>
			</div>
		
		</div>
	);
};

export default AllPeople;
