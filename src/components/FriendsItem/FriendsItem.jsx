import React from 'react';
import s from './FriendsItem.module.scss'
import {deleteFriend, openModalBlock} from "../../redux/slices/navigationSlice";
import {useDispatch} from "react-redux";
import BtnRequestsFriend from "../BtnRequestsFriend/BtnRequestsFriend";
import {setFriendsCurrent} from "../../redux/slices/friendsSlice";

import useMatchMedia from "../hooks/useMatchMedia";
import {BiMessageRounded} from "react-icons/bi";
import {Link} from "react-router-dom";
import EmptyImage from "../ui/EmptyImage/EmptyImage";
import ActionButton from "../ui/ActionButton/ActionButton";
import ActionLink from "../ui/ActionLink/ActionLink";
import Text from '../ui/Text/Text'
import {BsThreeDots} from "react-icons/bs";
import MenuFriends from "./MenuFriends/MenuFriends";

const FriendsItem = ({obj, requests, handlerCancel, handlerAccept, index}) => {
	const dispatch = useDispatch()

	const {isMobile} = useMatchMedia()

	const deleteFriendFunc = () => {
		dispatch(deleteFriend({flag: true, obj: obj.friend}))
	}

	const openWriteBox = () => {
		dispatch(openModalBlock({writeFriend: true}))
		dispatch(setFriendsCurrent(obj))
	}


	return (
		<div className={s.wrapper__item}>
			<div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
				<Link to={`/profile/${obj.friend.pk}`}>
					<EmptyImage
						image={obj?.friend?.image}
						name={{firstName: obj.friend.first_name, lastName: obj.friend.last_name}}
						index={index}
						noOnline={obj?.friend?.online}
						sizeIndicator={{right: 6}}
						style={{
							width: isMobile ? 44 : 80,
							height: isMobile ? 44 : 80,
							fontSize: isMobile ? 16 : 24,
						}}
					/>
				</Link>
				<div className={s.info__user}>
					<ActionLink to={`/profile/${obj.friend.pk}`}>
						{obj.friend.first_name} {obj.friend.last_name}
					</ActionLink>

					{requests !== 'requests' ? <Text type={'button'}
					                                 className={s.writeAMessage}
					                                 onClick={openWriteBox}>{isMobile ?
							<BiMessageRounded/> : 'Написать сообщение'} </Text>

						:
						<BtnRequestsFriend handlerCancel={handlerCancel} handlerAccept={handlerAccept}/>

					}

				</div>
			</div>
			{/*{requests !== 'requests'*/}
			{/*    && <ActionButton*/}
			{/*        second*/}
			{/*        onClick={deleteFriendFunc}>Удалить из друзей</ActionButton>*/}
			{/*}*/}
			<MenuFriends friend={obj}/>
		</div>
	);
};

export default FriendsItem;
