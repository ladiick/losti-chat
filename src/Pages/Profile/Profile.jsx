import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import MyFriends from './../../components/MyFriends/MyFriends'
import s from './Profile.module.scss'
import {Link} from "react-router-dom";
import {BsPersonWorkspace} from "react-icons/bs";
import React from "react";

const Profile = () => {

	if(true){
		return (
			<div className={s.page__develop}>
				<span>Страница в разработке <BsPersonWorkspace/></span>
				<Link to='/'>В диалоги</Link>
			</div>)
	}

	return (
		<>
			<div className={s.wrapper__friends}>
				<ProfileInfo/>
				<div className={s.my_friends__photo_block}>
					<div className={s.photo}>Здесь фото блок</div>
					{/*<div>Друзья</div>*/}
					<div className={s.friend}>
					<MyFriends/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
