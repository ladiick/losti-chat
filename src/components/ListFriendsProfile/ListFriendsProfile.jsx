import React from 'react';
import s from './ListFriendsProfile.module.scss'

import {useGetFriendsQuery} from "../features/friendsApiSlice";

import ListFriendsProfileItem from "../ListFriendsProfileItem/ListFriendsProfileItem";
import useMatchMedia from "../hooks/useMatchMedia";
import {useGetFriendsRequestsQuery} from "../features/friendsRequestsApiSlice";

const ListFriendsProfile = () => {
    const {data: friends = []} = useGetFriendsQuery()
    const {data: request =[]} = useGetFriendsRequestsQuery()
    const {isMobile} = useMatchMedia()




    if (isMobile) {
        return (
            <div className={s.wrapper__friends}>
                <h1>Друзья <span>{friends?.length}</span> {request.length ? <span>&#183; {request.length}</span>  : ''}
                </h1>
                <div className={s.items}>
                    {
                        friends.map((obj, index) => {
                                if (index > 3) {
                                    return ''
                                } else {
                                    return <ListFriendsProfileItem key={obj.id} obj={obj} index={index}/>
                                }
                            }
                        )
                    }
                </div>
            </div>
        );
    }


    return (
        <div className={s.wrapper__friends}>
            <h1>Друзья <span>{friends?.length}</span></h1>
            <div className={s.items}>
                {
                    friends.map((obj, index) => (<ListFriendsProfileItem key={obj.id} obj={obj} index={index}/>))
                }
            </div>
        </div>
    );
};

export default ListFriendsProfile;