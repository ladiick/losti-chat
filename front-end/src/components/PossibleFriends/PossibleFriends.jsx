import React, {useEffect} from 'react';
import {findPeople, setAddFriend, setCurrentPeopleAll} from "../../redux/slices/peopleSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchPossibleFriends} from "../../redux/slices/friendsSlice";
import s from "./PossibleFriends.module.scss"
import axios from "axios";
import {HOST} from "../api/HOST";
import PossibleFriendsItem from "../PossibleFriendsItem/PossibleFriendsItem";
import {toast} from "react-toastify";
import {motion} from 'framer-motion'
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
					second_user: obj.possible_friend.pk
				},
				{
					headers: {Authorization: `JWT ${userAccessToken}`},
				}).then(res => {
				dispatch(setAddFriend(index))
				toast.success('Заявка отправлена', {
					position: "top-center",
					autoClose: 1500,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			})
		}
	
	return (
		<motion.div
			initial={{
				y: 200,
				opacity: 0
			}}
			animate={{
				y: 0,
				opacity: 1
			}}
			transition={{
				type: 'tween',
				duration: 0.5
			}}
			className={s.wrapper}>
			<h1 className={s.title__block}>Возможные друзья</h1>
			
			{
				possibleFriends?.map((obj,index)=> <PossibleFriendsItem
					key={obj.possible_friend.pk}
				  obj={obj}
					handlerPeople={()=>handlerPeople(index,obj)}
				/>)
			}
			
		</motion.div>
	);
};

export default PossibleFriends;
