import s from './People.module.scss'
import PeopleItem from "../PeopleItem/PeopleItem";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPeople, setPeopleChecked} from "../../redux/slices/peopleSlice";
import PeopleItemSceleton from "../PeopleItem/PeopleItemSceleton";
import {fetchMessage} from "../../redux/slices/messageSlice";
import favorite from '../assets/favorite.svg'

const People = () => {
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const isAuth = useSelector(state => state.user.isAuth)
	const people = useSelector(state => state.people.people)
	const myId = useSelector(state => state.user.aboutUser.id)
	const status = useSelector(state => state.people.status)
	
	const peopleChecked = useSelector(state => state.people.peopleChecked)
	
	const dispatch = useDispatch()
	useEffect(() => {
		
		if (isAuth && userAccessToken) {
			dispatch(fetchPeople(userAccessToken))
		}
		
	}, [isAuth, userAccessToken]);
	
	const handlerPeople = (id) => {
		dispatch(setPeopleChecked(id))
		
		dispatch(fetchMessage({userAccessToken, id}))
	}
	
	
	
	return (
		<div className={s.block__people}>
			
			<h1 className={s.title__people}>Сообщения</h1>
			
			
			<div className={s.wrapper__items}>
				
				
				{status === 'loading' && (
					<div className={s.sceletons}>
						{[...new Array(7)]
							.map((_, index) => <PeopleItemSceleton key={index}/>)}
					</div>)
				}
				
				
				{people.map((obj, index) => obj.sender.pk === myId && obj.recipient.pk !== myId ?
					<PeopleItem
						key={obj.recipient.pk}
						id={obj.recipient.pk}
						firstName={obj.recipient.first_name}
						lastName={obj.recipient.last_name}
						message={`Вы: ${obj.message}`}
						
						time={obj.time}
						img={obj.recipient.image}
						handlerPeople={() => handlerPeople(obj.recipient.pk)}
					/>
					
					: obj.sender.pk === myId && obj.recipient.pk === myId
						
						?
						<PeopleItem
							key={0}
							id={obj.sender.pk}
							firstName={'Избранное'}
							lastName={''}
							message={obj.message}
							time={obj.time}
							img={favorite}
							handlerPeople={() => handlerPeople(obj.sender.pk)}
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
							handlerPeople={() => handlerPeople(obj.sender.pk)}
						/>
				)}
			
			
			</div>
		</div>
	)
	
}

export default People