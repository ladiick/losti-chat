import React from 'react';
import s from "./ProfileInfoAnotherUser.module.scss";
import ActionButton from "../../ui/ActionButton/ActionButton";
import {BsPersonCheck} from "react-icons/bs";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import {useGetCurrentPersonQuery} from "../../features/currentPeopleApiSlice";
import {useParams} from "react-router-dom";

const ProfileInfoAnotherUser = () => {
    const {id} = useParams()
    const {data} = useGetCurrentPersonQuery(id)
    console.log('gffgf')
    return (
        <ProfileInfo image={data?.image} firstName={data?.first_name} lastName={data?.last_name}>

            <div className={s.block__communicate}>
                <ActionButton style={{marginRight: 5}}>Сообщение</ActionButton>
                {
                    true ? <span
                            className={s.exist__friend}><BsPersonCheck/></span>
                        :
                        <span className={s.add__friend}>Добавить в друзья</span>
                }
            </div>

        </ProfileInfo>


    );
};

export default ProfileInfoAnotherUser;
