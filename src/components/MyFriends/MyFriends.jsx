import s from './MyFriends.module.scss'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFriends, fetchFriendsRequests} from "../../redux/slices/friendsSlice";
import FriendsItem from "../FriendsItem/FriendsItem";
import SearchBlock from "../SearchBlock/SearchBlock";

function MyFriends() {
	
	const dispatch = useDispatch()
	const userAccessToken = useSelector(state => state.user.tokens.access)
	const userRefreshToken = useSelector(state => state.user.tokens.refresh)
	const isAuth = useSelector(state => state.user.isAuth)
	const friends = useSelector(state => state.friends.friends)
	
	const [searchValue, setSearch] = useState('');
	useEffect(() => {
		if (isAuth && userAccessToken) {
			dispatch(fetchFriends({userAccessToken, userRefreshToken}))
			// dispatch(fetchFriendsRequests({userAccessToken, userRefreshToken}))
		}
	}, [isAuth, userAccessToken]);
	
	
	return (
		
		<div className={s.wrapper}>
			<header>
				<div className={s.quantity__friends}>
					<p>Все друзья</p>
					<span>{friends.length}</span>
				</div>
				<div className={s.search__friends}>
					<span>Найти друзей</span>
				</div>
			</header>
			<SearchBlock searchValue={searchValue} setSearch={setSearch}/>
			<div className={s.block__friends}>
				{
					friends.filter(obj => (
						obj.friend.first_name.toLowerCase().includes(searchValue.toLowerCase())
						||
						obj.friend.last_name.toLowerCase().includes(searchValue.toLowerCase())
					)).map(obj => <FriendsItem key={obj.id} obj={obj}/>)
				}
			</div>
		</div>
	
	);
}

export default MyFriends;