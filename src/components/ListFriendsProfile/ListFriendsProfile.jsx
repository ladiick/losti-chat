import React from 'react';
import s from './ListFriendsProfile.module.scss'

import {useGetFriendsQuery} from "../features/friendsApiSlice";

import ListFriendsProfileItem from "../ListFriendsProfileItem/ListFriendsProfileItem";
const ListFriendsProfile = () => {
    const {data:friends=[]} = useGetFriendsQuery()
    return (
        <div className={s.wrapper__friends}>
            <h1>Друзья <span>{friends?.length}</span></h1>
            <div className={s.items}>
                {
                    friends.map((obj,index)=>(<ListFriendsProfileItem key={obj.id} obj={obj} index={index}/>))
                }
            </div>
        </div>
    );
};

export default ListFriendsProfile;