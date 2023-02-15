import React, {useEffect} from 'react';
import s from './FriendRequests.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchFriendsRequests, setRequestFriend} from "../../redux/slices/friendsSlice";
import FriendsItem from "../FriendsItem/FriendsItem";
const FriendRequests = () => {
	const friendRequests = useSelector(state => state.friends.friendsRequests)
	
	const dispatch = useDispatch()
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
	
	const isAuth = useSelector(state => state.user.isAuth)
	
	useEffect(() => {
		if (isAuth && userAccessToken) {
			dispatch(fetchFriendsRequests({userAccessToken,userRefreshToken}))
		}
		return ()=>{
			// dispatch(setCurrentPeopleAll({}))
			
		}
	}, [isAuth, userAccessToken]);
	
	
	const handlerCurrentRequest = (obj)=>{
		console.log(obj)
		dispatch(setRequestFriend(obj))
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
					friendRequests.map(obj=> <FriendsItem key={obj.pk} obj={obj} requests={'requests'} handlerCurrentRequest={()=>handlerCurrentRequest(obj)}/>)
				}
				
			</div>
			
			
			
		</div>
	);
};

export default FriendRequests;
