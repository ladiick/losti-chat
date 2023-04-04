
import {BsPeople, BsPersonCircle} from "react-icons/bs";
import {ImEnter} from "react-icons/im";
import React from "react";
import {CgProfile} from "react-icons/cg";
import {BiMessageRounded} from "react-icons/bi";
import {IoNotificationsOutline} from "react-icons/io5";
import {RxHamburgerMenu} from "react-icons/rx";
import {MdOutlineLogout} from "react-icons/md";

export const styleText =(isMobile)=>{
    return {
        textAlign: 'left',
        flexGrow: 1,
        paddingLeft: !isMobile ? 10 : 0,
        fontSize: isMobile && 10
    }
}

export const noAuthItems = [
    {
        id: 149,
        title: 'Зарегистрироваться',
        href: '/registration',
        icon: <BsPersonCircle/>,
    },

    {
        id: 150,
        title: 'Войти',
        href: '/authorization',
        icon: <ImEnter/>
    }

]


export const authItems = (myId,countRequests,isMobile)=>{

    return [
        {
            id: 144,
            title: 'Моя страница',
            href: `/profile/${myId}`,
            icon: <CgProfile/>,
        },
        {
            id: 145,
            title: 'Сообщения',
            href: '/',
            icon: <BiMessageRounded/>,
            count: 1
        },
        {
            id: 146,
            title: 'Друзья',
            href: '/friends',
            icon: <BsPeople/>,
            count: countRequests
        },
        {
            id: 147,
            title: 'Уведомления',
            href: '',
            icon: <IoNotificationsOutline/>,
            count: 1
        },
        {
            id: 148,
            title: isMobile ? 'Меню' :'Выход',
            href: isMobile ? '/menu' : '/logout',
            icon: isMobile ? <RxHamburgerMenu/> : <MdOutlineLogout/>,
        },


    ]
}