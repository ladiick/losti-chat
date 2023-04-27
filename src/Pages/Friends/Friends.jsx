import React, {useEffect} from 'react'
import MyFriends from '../../components/MyFriends/MyFriends'
import 'react-toastify/dist/ReactToastify.css';
import s from './Friends.module.scss'
import FriendRequests from "../../components/FriendRequests/FriendRequests";
import {Outlet, useLocation} from "react-router-dom";
import NavigateFriends from "../../components/NavigateFriends/NavigateFriends";
import PossibleFriends from "../../components/PossibleFriends/PossibleFriends";
import useMatchMedia from "../../components/hooks/useMatchMedia";

const Friends = () => {

    const location = useLocation()
    const {isMobile} = useMatchMedia()

  useEffect(()=>{
    document.title = 'Друзья'
  },[])

    const ifOutlet = ()=>{
        if(location.pathname !== '/friends'){
            return <Outlet/>
        }
        else{
            return (
                <>
                    <FriendRequests/>
                    <MyFriends/>
                </>
            )
        }
    }

    return (
        <div className={s.friend__page}>
            <div className={s.wrapper__friends}>
                {ifOutlet()}
            </div>
            <div className={s.nav__block}>
                {!isMobile && <NavigateFriends/>}
                <PossibleFriends/>
            </div>
        </div>
    )
}

export default Friends
