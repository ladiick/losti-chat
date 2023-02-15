import React from 'react'
import AllPeople from '../../components/AllPeople/AllPeople'
import Home from '../../components/Home/Home'
import Modul from '../../components/Modul/Modul'
import MyFriends from '../../components/MyFriends/MyFriends'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';

import s from './Friends.module.scss'
import FriendRequests from "../../components/FriendRequests/FriendRequests";
const Friends = () => {
	return (
		<>
			<Home>
				<div className={s.wrapper__friends}>
					<FriendRequests/>
					<MyFriends />
				</div>
				<AllPeople />
				<Modul />
			</Home>
		</>
	)
}

export default Friends
