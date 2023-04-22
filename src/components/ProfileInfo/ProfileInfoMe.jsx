import s from './ProfileInfoMe.module.scss'
import {Link, useNavigate, useParams} from "react-router-dom";
import {FaUserEdit} from "react-icons/fa";
import React from "react";
import {useSelector} from "react-redux";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileInfoAnotherUser from "./ProfileInfoAnotherUser/ProfileInfoAnotherUser";
import ActionInput from "../ui/ActionInput/ActionInput";
import ActionButton from "../ui/ActionButton/ActionButton";

const ProfileInfoMe = () => {
	const {id} = useParams()
	const myId = useSelector(state => state.user.aboutUser.id)
	const aboutUserMe = useSelector(state => state.user.aboutUser)
	const navigate = useNavigate()

	if (myId && myId != id) {
		return <ProfileInfoAnotherUser/>
	}

	return (
		<ProfileInfo
			online={aboutUserMe?.settings?.online}
			image={aboutUserMe?.image}
			firstName={aboutUserMe?.first_name}
			lastName={aboutUserMe?.last_name}>

			<ActionButton leftIcon={<FaUserEdit/>} second onClick={() => navigate('/menu/edit')} >
				Редактировать профиль
			</ActionButton>


		</ProfileInfo>
	)
}


export default ProfileInfoMe
