import React, {useEffect, useState} from 'react';
import s from './AllPeople.module.scss'
import {useDispatch, useSelector} from "react-redux";
import PeopleItem from "../PeopleItem/PeopleItem";
import {
	findPeople,
	setCurrentPeopleAll,
	setIndex,
} from "../../redux/slices/peopleSlice";

const AllPeople = () => {
	const people = useSelector(state => state.people.peopleAll)
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
	
	const isAuth = useSelector(state => state.user.isAuth)
	const myId = useSelector(state => state.user.aboutUser.id)
	const dispatch = useDispatch()
	
	useEffect(() => {
		if (isAuth && userAccessToken) {
			dispatch(findPeople({userAccessToken,userRefreshToken}))
		}
		return ()=>{
			dispatch(setCurrentPeopleAll({}))
			
		}
	}, [isAuth, userAccessToken]);
	
	const handlerPeople = (current__obj, index) => {
		dispatch(setIndex(index))
		dispatch(setCurrentPeopleAll(current__obj))
	}
	
	return (
		<div className={s.wrapper}>
			<h1 className={s.title__block}>Возможные друзья</h1>
			
			
			<div className={s.block__people}>
				<div className={s.wrapper__items}>
					
					{people?.map((obj, index) =>
								<PeopleItem
									key={obj.pk}
									id={obj.pk}
									firstName={obj.first_name}
									lastName={obj.last_name}
									img={obj.image}
									friend={'friend'}
									handlerPeople={() => handlerPeople(obj, index)}
								/>
								
					)}
				</div>
			</div>
		
		</div>
	);
};

export default AllPeople;
