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


const FriendsItem = ({obj, requests, handlerCancel, handlerAccept, index}) => {

    const dispatch = useDispatch()

    const {isMobile} = useMatchMedia()

    const deleteFriendFunc = () => {
        dispatch(deleteFriend({flag: true, obj: obj.friend}))
    }

    return (
        <div className={s.wrapper__item}>
            <div style={{display: 'flex', alignItems: 'center',width:'100%'}}>
                <Link to={`/profile/${obj.friend.pk}`}>
                    <EmptyImage
                        image={obj?.friend?.image}
                        firstName={obj.friend.first_name}
                        lastName={obj.friend.last_name}
                        index={index}
                        width={isMobile ? 44 : 80}
                        height={isMobile ? 44 : 80}
                        marginRight={15}
                        fontSize={isMobile ? 16 : 24}
                    />
                </Link>
                <div className={s.info__user}>
                    <Link to={`/profile/${obj.friend.pk}`}>
                        {obj.friend.first_name} {obj.friend.last_name}</Link>

                    {requests !== 'requests' ? <span
                            className={s.writeAMessage}
                            onClick={() => {
                                dispatch(openModalBlock(true))
                                dispatch(setFriendsCurrent(obj))
                            }}>{isMobile ? <BiMessageRounded/> : 'Написать сообщение'} </span>

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

        </div>
    );
};

export default FriendsItem;
