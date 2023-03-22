import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import s from './Profile.module.scss'
import {Outlet, useLocation, useNavigation} from "react-router-dom";
import React from "react";
import ListFriendsProfile from "../../components/ListFriendsProfile/ListFriendsProfile";
import Gallery from "../../components/Gallery/Gallery";

const Profile = () => {

	const location = useLocation()


	if(location.pathname === '/profile/settings'){
		return <Outlet/>
	}

	return (
		<>
			<div className={s.wrapper__friends}>
				<ProfileInfo/>
				<div className={s.my_friends__photo_block}>
					<div className={s.photo}>
					<Gallery/>
					</div>
					<div className={s.friend}>
						<ListFriendsProfile/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
