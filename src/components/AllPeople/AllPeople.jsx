import React, {useEffect, useState} from 'react';
import s from './AllPeople.module.scss'
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import {useDispatch, useSelector} from "react-redux";
import PeopleItem from "../PeopleItem/PeopleItem";
import {
	findPeople,
	setCurrentPeopleAll,
	setIndex,
} from "../../redux/slices/peopleSlice";

const AllPeople = () => {
	const [searchValue, setSearch] = useState('');
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
		setSearch('')
	}
	
	return (
		<div className={s.wrapper}>
			<BurgerMenu/>
			<div className={s.block__search}>
				<svg version="1.1" viewBox="0 0 512 512">
					<path
						d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z"/>
				</svg>
				
				<input type='text'
				       placeholder='Search'
				       value={searchValue}
				       onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className={s.block__people}>
				<div className={s.wrapper__items}>
					
					{people?.filter(people =>
							people?.first_name.toLowerCase().includes(searchValue.toLowerCase())
							||
							people?.last_name.toLowerCase().includes(searchValue.toLowerCase())
					).map((obj, index) =>
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
