import s from './People.module.scss'


import PeopleItem from "../PeopleItem/PeopleItem";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPeople} from "../../redux/slices/peopleSlice";
const People = () => {
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const isAuth = useSelector(state => state.user.isAuth)
	const people = useSelector(state => state.people.people)
	const myId = useSelector(state => state.user.aboutUser.id)
	
	const dispatch = useDispatch()
	
	useEffect(() => {
		
		if(isAuth){
			dispatch(fetchPeople(userAccessToken))
		}
		
	}, [isAuth]);
	
	
	
	
	return (
		<div className={s.block__people}>
			
			<h1 className={s.title__people}>Сообщения</h1>
			
			
			<div className={s.wrapper__items}>
				
				{people.map(obj => obj.sender.pk === myId ?
					<PeopleItem
						key={obj.recipient.pk}
						firstName={obj.recipient.first_name}
						lastName={obj.recipient.last_name}
						message={`Вы: ${obj.message}`}
						time={obj.time}
						img={obj.recipient.image}
						
					/>
				:
					<PeopleItem
						key={obj.sender.pk}
						firstName={obj.sender.first_name}
						lastName={obj.sender.last_name}
						message={obj.message}
						time={obj.time}
						img={obj.sender.image}
						
						
					/>
				)}
			
			
			</div>
		</div>
	)
	
}

export default People