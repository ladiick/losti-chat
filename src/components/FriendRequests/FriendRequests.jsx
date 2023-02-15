import React, {useEffect} from 'react';
import s from './FriendRequests.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchFriendsRequests, setAddFriendRequest, updateFriends} from "../../redux/slices/friendsSlice";
import FriendsItem from "../FriendsItem/FriendsItem";
import axios from "axios";
import {HOST} from "../api/HOST";

const FriendRequests = () => {
	const friendRequests = useSelector(state => state.friends.friendsRequests)
	
	const dispatch = useDispatch()
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
	
	const isAuth = useSelector(state => state.user.isAuth)
	
	useEffect(() => {
		if (isAuth && userAccessToken) {
			dispatch(fetchFriendsRequests({userAccessToken, userRefreshToken}))
		}
		return () => {
			// dispatch(setCurrentPeopleAll({}))
			
		}
	}, [isAuth, userAccessToken]);
	
	

	
	const handlerAccept = (obj,index)=>{
		axios.post(`http://${HOST}/api/v1/friends/`, {
				second_user: obj.friend.pk
			},
			{
				headers: {Authorization: `JWT ${userAccessToken}`},
			}).then(res => {
			dispatch(setAddFriendRequest(index))
			dispatch(updateFriends(obj))
		})
	}
	const handlerCancel = (obj,index)=>{
		
		axios.patch(`http://${HOST}/api/v1/friends/${obj.friend.pk}/denied/`,{},
			{
				headers: {Authorization: `JWT ${userAccessToken}`},
			}).then(res => {
			dispatch(setAddFriendRequest(index))
		})
		
	}
	
	
	if(!friendRequests.length){
		return
	}
	
	return (
		<div className={s.wrapper}>
			<header className={s.wrapper__header}>
				<span>
					Заявки в друзья {friendRequests.length}
				</span>
			</header>
			
			<div className={s.block__friendRequests}>
				
				{
					friendRequests.map((obj,index) => <FriendsItem
						key={obj.pk} obj={obj} requests={'requests'}
						handlerAccept={() => handlerAccept(obj,index)}
						handlerCancel={()=>handlerCancel(obj,index)}
					/>)
				}
			
			</div>
		
		
		</div>
	);
};

export default FriendRequests;
