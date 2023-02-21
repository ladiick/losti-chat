import React, {useEffect} from 'react';
import {findPeople, setCurrentPeopleAll} from "../../redux/slices/peopleSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchPossibleFriends} from "../../redux/slices/friendsSlice";
import s from "../AllPeople/AllPeople.module.scss";
import AllPeopleItem from "../AllPeopleItem/AllPeopleItem";
import axios from "axios";
import {HOST} from "../api/HOST";
import PossibleFriendsItem from "../PossibleFriendsItem/PossibleFriendsItem";

const PossibleFriends = () => {
	const dispatch = useDispatch()
	
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
	const isAuth = useSelector(state => state.user.isAuth)
	
	const possibleFriends = useSelector(state => state.friends.possibleFriends)
	// console.log('possibleFriend',possibleFriends)
	
	useEffect(() => {
		if (isAuth && userAccessToken) {
			dispatch(fetchPossibleFriends({userAccessToken, userRefreshToken}))
		}
		
	}, [isAuth, userAccessToken]);
	
	const handlerPeople = (index, obj) => {
			axios.post(`http://${HOST}/api/v1/friends/`, {
					second_user: obj.pk
				},
				{
					headers: {Authorization: `JWT ${userAccessToken}`},
				}).then(res => {
				// dispatch(setAddFriend(index))
			})
		}
	
	return (
		<div className={s.wrapper}>
			<h1 className={s.title__block}>Возможные друзья</h1>
			
			{
				possibleFriends?.map(obj=> <PossibleFriendsItem
					key={obj.possible_friend.pk}
				  obj={obj}
					handlerPeople={handlerPeople}
				/>)
			}
			
		</div>
	);
};

export default PossibleFriends;
