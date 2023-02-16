import React, {useState} from 'react';
import s from './SearchFriends.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {searchFriend} from "../../redux/slices/navigationSlice";
import SearchBlock from "../SearchBlock/SearchBlock";
import AllPeopleItem from "../AllPeopleItem/AllPeopleItem";
import axios from "axios";
import {HOST} from "../api/HOST";
import {setAddFriend} from "../../redux/slices/peopleSlice";

const SearchFriends = () => {
	const [search, setSearch] = useState();
	
	const dispatch = useDispatch()
	const isVisible = useSelector(state => state.navigation.searchFriend)
	const people = useSelector(state => state.people.peopleAll)
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	
	const handlerPeople = (index, obj) => {
		axios.post(`http://${HOST}/api/v1/friends/`, {
				second_user: obj.pk
			},
			{
				headers: {Authorization: `JWT ${userAccessToken}`},
			}).then(res => {
			dispatch(setAddFriend(index))
			
		})
	}
	
	return (
		<div className={isVisible ? s.overlay__active : s.overlay} onClick={() => dispatch(searchFriend(false))}>
			
			<div className={s.wrapper__search__block} onClick={(e) => e.stopPropagation()}>
				<h1 className={s.wrapper__title}>Поиск друзей</h1>
				<SearchBlock search={search} setSearch={setSearch}/>
				
				<div className={s.list__allpeople}>
					
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

export default SearchFriends;
