import s from './People.module.scss'
import PeopleItem from "../PeopleItem/PeopleItem";
import {useEffect,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	fetchPeople,
	setCurrentPeople, setIndex,
	setPeopleChecked,
} from "../../redux/slices/peopleSlice";
import PeopleItemSceleton from "../PeopleItem/PeopleItemSceleton";
import {fetchMessage} from "../../redux/slices/messageSlice";
import favorite from '../assets/favorite.svg'

const People = () => {
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const isAuth = useSelector(state => state.user.isAuth)
	const people = useSelector(state => state.people.people)
	const myId = useSelector(state => state.user.aboutUser.id)
	const status = useSelector(state => state.people.status)
	
	
	const dispatch = useDispatch()
	useEffect(() => {
		if (isAuth && userAccessToken) {
			dispatch(fetchPeople(userAccessToken))
		}
	}, [isAuth, userAccessToken]);
	
	
	
	const handlerPeople = (id,current__obj,obj,index) => {
		 dispatch(setIndex(index))
		 dispatch(setPeopleChecked(id))
		 dispatch(setCurrentPeople(current__obj))
		 dispatch(fetchMessage({userAccessToken, id}))
	}
	
	
	
	
	return (
		<div className={s.block__people}>
			
			<h1 className={s.title__people}>Люди</h1>
			
			
			<div className={s.wrapper__items}>
				
				
				{status === 'loading' && (
					<div className={s.sceletons}>
						{[...new Array(7)]
							.map((_, index) => <PeopleItemSceleton key={index}/>)}
					</div>)
				}
				
				
				{people.map((obj, index) => obj.sender.pk === myId && obj.recip.pk !== myId ?
					<PeopleItem
						key={obj.recip.pk}
						id={obj.recip.pk}
						firstName={obj.recip.first_name}
						lastName={obj.recip.last_name}
						message={`Вы: ${obj.message}`}
						time={obj.time}
						img={obj.recip.image}
						handlerPeople={() => handlerPeople(obj.recip.pk,obj.recip,obj,index)}
					/>
					
					: obj.sender.pk === myId && obj.recip.pk === myId
						
						?
						<PeopleItem
							key={0}
							id={obj.sender.pk}
							firstName={'Избранное'}
							lastName={''}
							message={obj.message}
							time={obj.time}
							img={favorite}
							handlerPeople={() => handlerPeople(obj.sender.pk,obj.sender,obj,index)}
						/>
						:
						<PeopleItem
							key={obj.sender.pk}
							id={obj.sender.pk}
							firstName={obj.sender.first_name}
							lastName={obj.sender.last_name}
							message={obj.message}
							time={obj.time}
							img={obj.sender.image}
							handlerPeople={() => handlerPeople(obj.sender.pk,obj.sender,obj,index)}
						/>
				)}
			
			
			</div>
		</div>
	)
	
}

export default People