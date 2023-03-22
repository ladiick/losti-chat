import React from 'react';
import SceletonHeader from "../SceletonHeader";
import favorite from "../../assets/favorite.svg";
import {HOST} from "../../api/HOST";
import s from "./HeaderChat.module.scss";
import {useNavigate, useSearchParams} from "react-router-dom";
import {openChatBlock} from "../../../redux/slices/navigationSlice";
import {FiArrowLeft} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";

const HeaderChat = ({isLoading, myId, peopleCurrent}) => {

    const dispatch = useDispatch()
    const navigation = useNavigate()
    const chatActive = useSelector(state => state.navigation.chat)

    const [searchParams, setSearchParams] = useSearchParams()


    if (isLoading) {
        return (
            <SceletonHeader/>
        )
    }


    return (
        <header className={s.header}>
            <div className={s.left__side}>
                {chatActive && <div className={s.arrow__back} onClick={() => {
                    navigation('/')
                    dispatch(openChatBlock(false))
                }}>
                    <FiArrowLeft/>
                </div>}
                {searchParams.get('dialogs') === myId ?
                    <img
                        src={favorite}
                        alt="logo"/> :
                    peopleCurrent.image ?
                        <img
                            src={`${HOST + peopleCurrent.image}`}
                            alt="logo"/>
                        :
                        <span className={s.empty__img}
                        >{peopleCurrent?.first_name?.[0]}{peopleCurrent?.last_name?.[0]}</span>

                }
                <div className={s.person__info}>
                    <h1>
                        {searchParams.get('dialogs') === myId ? 'Избранное' : `${peopleCurrent.first_name} ${peopleCurrent.last_name}`} </h1>
                    {/*<p>Online</p>*/}
                </div>
            </div>
            <div className={s.right_side}>
            </div>
        </header>
    )
};

export default HeaderChat;