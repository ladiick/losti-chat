import React, {useEffect} from 'react'
import AllPeople from '../../components/AllPeople/AllPeople'
import Home from '../../components/Home/Home'
import Modul from '../../components/Modul/Modul'
import MyFriends from '../../components/MyFriends/MyFriends'
import 'react-toastify/dist/ReactToastify.css';
import s from './Friends.module.scss'
import FriendRequests from "../../components/FriendRequests/FriendRequests";
import {Route, Routes, useLocation} from "react-router-dom";
import FriendsRequestsPage from "../FriendsRequestsPage/FriendsRequestsPage";
import NavigateFriends from "../../components/NavigateFriends/NavigateFriends";
import SearchFriends from "../../components/SearchFriends/SearchFriends";
import PossibleFriends from "../../components/PossibleFriends/PossibleFriends";
import {toast, ToastContainer} from "react-toastify";

const Friends = () => {
	
	const location = useLocation()

	return (
		<>
			<Home>
				<div className={s.wrapper__friends}>
					{location.pathname !== '/friends/requests' && <FriendRequests/>}
					<Routes>
						<Route path='requests' element={<FriendsRequestsPage/>}/>
					</Routes>
					{location.pathname !== '/friends/requests' && <MyFriends/>}
				</div>
				<div className={s.nav__block}>
					<NavigateFriends/>
					<PossibleFriends />
				</div>
				<SearchFriends />
			</Home>

		</>
	)
}

export default Friends
