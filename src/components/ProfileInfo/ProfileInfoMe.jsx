import s from './ProfileInfoMe.module.scss'
import {Link, useParams} from "react-router-dom";
import {FaUserEdit} from "react-icons/fa";
import React from "react";
import {useSelector} from "react-redux";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileInfoAnotherUser from "./ProfileInfoAnotherUser/ProfileInfoAnotherUser";

const ProfileInfoMe = () => {
    const {id} = useParams()
    const myId = useSelector(state => state.user.aboutUser.id)
    const aboutUserMe = useSelector(state => state.user.aboutUser)

    if (myId && myId != id) {
        return <ProfileInfoAnotherUser/>
    }


    return (
        <ProfileInfo
            image={aboutUserMe?.image}
            firstName={aboutUserMe?.first_name}
            lastName={aboutUserMe?.last_name}>

            <Link className={s.edit__profile}>
                <FaUserEdit/>
                Редактировать профиль
            </Link>


        </ProfileInfo>
    )
}


export default ProfileInfoMe
