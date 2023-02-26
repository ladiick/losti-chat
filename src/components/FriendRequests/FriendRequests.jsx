import React, {useEffect} from 'react';
import s from './FriendRequests.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchFriendsRequests, setAddFriendRequest, updateFriends} from "../../redux/slices/friendsSlice";
import FriendsItem from "../FriendsItem/FriendsItem";
import axios from "axios";
import {HOST} from "../api/HOST";
import {Link, useLocation} from "react-router-dom";

const FriendRequests = ({allRequests}) => {
	const friendRequests = useSelector(state => state.friends.friendsRequests)
	const location = useLocation()
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
	
	
	const handlerAccept = (obj, index) => {
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
	const handlerCancel = (obj, index) => {
		
		axios.patch(`http://${HOST}/api/v1/friends/${obj.friend.pk}/denied/`, {},
			{
				headers: {Authorization: `JWT ${userAccessToken}`},
			}).then(res => {
			dispatch(setAddFriendRequest(index))
		})
		
	}
	
	if (!friendRequests?.length && location.pathname === '/friends/requests') {
		return (
			
			<div className={s.wrapper__requests}>
				<div style={{textAlign: 'center',fontSize: 14}}>У вас нет заявок в друзья</div>
			</div>
		)
	}
	else if (!friendRequests?.length){
		return
	}
	
	return (
		<div className={location.pathname !== '/friends/requests' ? s.wrapper : s.wrapper__requests }>
			<header className={s.wrapper__header}>
				<span>
					Заявки в друзья {friendRequests?.length}
				</span>
				{location.pathname !== '/friends/requests' && <Link to={'/friends/requests'}>
					Показать всех
					<svg height="24px" version="1.1" viewBox="0 0 512 512" width="24px">
						<polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "/>
					</svg>
				</Link>}
			</header>
			
			
				
				{allRequests === 'allRequests' ?
					friendRequests.map((obj, index) => <FriendsItem
						key={obj.pk} obj={obj} requests={'requests'}
						handlerAccept={() => handlerAccept(obj, index)}
						handlerCancel={() => handlerCancel(obj, index)}
					/>)
					:
					<FriendsItem obj={friendRequests[0]}
					             requests={'requests'}
					             handlerAccept={() => handlerAccept(friendRequests[0], 0)}
					             handlerCancel={() => handlerCancel(friendRequests[0], 0)}/>
				}
			
			
		
		
		</div>
	);
};

export default FriendRequests;
