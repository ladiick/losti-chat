import s from './People.module.scss'
import PeopleItem from "../PeopleItem/PeopleItem";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	fetchPeople,
	setCurrentPeople, setCurrentPeopleAll, setIndex, setNullCurrentPeopleAll, setNullPeople
} from "../../redux/slices/peopleSlice";
import {fetchMessage} from "../../redux/slices/messageSlice";
import favorite from '../assets/favorite.svg'

const People = ({searchValue, setSearch}) => {
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
	
	const isAuth = useSelector(state => state.user.isAuth)
	const people = useSelector(state => state.people.people)
	const myId = useSelector(state => state.user.aboutUser.id)
	const status = useSelector(state => state.people.status)
	
	
	const dispatch = useDispatch()
	useEffect(() => {
		if (isAuth && userAccessToken) {
			dispatch(fetchPeople({userAccessToken,userRefreshToken}))
		}
		return ()=>{
			dispatch(setCurrentPeople({}))
		}
	}, [isAuth, userAccessToken]);
	
	
	const handlerPeople = (id, current__obj, index) => {
		dispatch(setIndex(index))
		dispatch(setCurrentPeople(current__obj))
		dispatch(fetchMessage({userAccessToken, id}))
		setSearch('')
	}
	
	
	return (
		<div className={s.block__people}>
			<div className={s.wrapper__items}>
				{status === 'loading'  && (
					<div className={s.load}></div>
				)}
				
				
				{people?.filter((people) => (
					people.sender.pk === myId && people.recip.pk !== myId ?
						people?.recip.first_name.toLowerCase().includes(searchValue.toLowerCase())
						||
						people?.recip.last_name.toLowerCase().includes(searchValue.toLowerCase())
						:
						people?.sender.first_name.toLowerCase().includes(searchValue.toLowerCase())
						||
						people?.sender.last_name.toLowerCase().includes(searchValue.toLowerCase())
				
				)).map((obj, index) => obj.sender.pk === myId && obj.recip.pk !== myId ?
					<PeopleItem
						key={obj.recip.pk}
						id={obj.recip.pk}
						firstName={obj.recip.first_name}
						lastName={obj.recip.last_name}
						message={`Вы: ${obj.message}`}
						time={obj.time}
						img={obj.recip.image}
						handlerPeople={() => handlerPeople(obj.recip.pk, obj.recip, index)}
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
							handlerPeople={() => handlerPeople(obj.sender.pk, obj.sender, index)}
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
							handlerPeople={() => handlerPeople(obj.sender.pk, obj.sender, index)}
						/>
				)}
			
			
			</div>
		</div>
	)
	
}

export default People