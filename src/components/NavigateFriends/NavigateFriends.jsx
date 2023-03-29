import React from 'react';
import s from './NavigateFriends.module.scss'
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {searchFriend} from "../../redux/slices/navigationSlice";
import {motion} from 'framer-motion'
import {useGetFriendsRequestsQuery} from "../features/friendsRequestsApiSlice";
const NavigateFriends = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	const classActive = ({isActive}) => isActive ? s.active : ''
	const {data: friendRequests = []} = useGetFriendsRequestsQuery()

	return (
		<motion.nav
			initial={{
				y: -200,
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
			className={s.wrapper__nav}>
			<ul className={s.list__nav__items}>
				<li className={s.nav__items}>
					<NavLink to='/friends'
					         title='Мои друзья'
					         className={location.pathname !== '/friends/requests' && classActive}>Мои друзья</NavLink>
				</li>
				<li className={s.nav__items}>
					<NavLink to='requests' title='Заявки в друзья'
					         className={classActive}>
						<h1 className={s.friend__requests}>Заявки в друзья</h1>
						{
							friendRequests?.length === 0 ? "" :
								<span className={s.quantity__requests}>{friendRequests?.length}</span>
						}
					</NavLink>
				</li>
				<li className={s.nav__items} onClick={()=> dispatch(searchFriend(true))}>
					<div className={s.search__friends} title='Поиск друзей'>Поиск друзей</div>
				</li>
			</ul>
		</motion.nav>
	);
};

export default NavigateFriends;
