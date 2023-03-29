import s from './Navigation.module.scss'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {BiMessageRounded} from "react-icons/bi";
import {BsPeople, BsPersonCircle, BsPersonWorkspace} from "react-icons/bs";
import {MdOutlineLogout} from 'react-icons/md'
import {ImEnter} from "react-icons/im";
import React from "react";
import logo from '../assets/logo.svg'
import {CgProfile} from "react-icons/cg";
import {IoNotificationsOutline} from "react-icons/io5";
import Notification from "../Notification/Notification";
import useMatchMedia from "../hooks/useMatchMedia";
import {useGetFriendsRequestsQuery} from "../features/friendsRequestsApiSlice";
import {RxHamburgerMenu} from "react-icons/rx";


const noAuthItems = [
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

const Navigation = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const classActive = ({isActive}) => isActive ? s.active : ''
    const {isMobile} = useMatchMedia()
    const {data: countRequests = []} = useGetFriendsRequestsQuery()

    const myId = useSelector(state => state.user.aboutUser.id)

    const authItems = [
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
            count: countRequests.length
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

    if (!isAuth) {
        return (
            <div
                className={s.wrapper__navigation}>
                <nav className={s.nav__content}>
                    <div className={s.name__company}>
					<span>
						<img src={logo} alt='logo'/>
						<h1>LOSTI-CHAT</h1>
					</span>
                    </div>
                    <ul className={s.list__items}>
                        {noAuthItems.map((obj, index) => (
                            <NavLink
                                key={obj.id}
                                to={obj.href} title={obj.title}
                                className={classActive}>
                                <li className={s.list__item}>
                                    {obj.icon}
                                    <h2>
                                        {obj.title}
                                    </h2>
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                    <div className='project__development'>
                        <span>Проект в разработке <BsPersonWorkspace/></span></div>
                </nav>
            </div>

        )
    }

    return (

        <div
            className={s.wrapper__navigation}>
            <nav className={s.nav__content}>
                <div className={s.name__company}>
					<span>
						<img src={logo} alt='logo'/>
						<h1>LOSTI-CHAT</h1>
					</span>
                </div>
                <ul className={s.list__items}>
                    {authItems.map((obj, index) => (
                        isMobile ?
                            <NavLink
                                key={obj.id}
                                to={obj.title === 'Уведомления' ? '/notification' : obj.href}
                                title={obj.title}
                                className={classActive}>
                                <li className={s.list__item}>
                                    {obj.icon}
                                    <h2>
                                        {isMobile && index === 0 ?
                                            'Профиль' : obj.title}
                                    </h2>
                                    {
                                        obj?.count ?
                                            <span className={s.quantity}>
                                            {obj.count}
                                                {console.log(obj.count)}
                                        </span>
                                            :
                                            ""
                                    }
                                </li>
                            </NavLink>
                            : obj.href ?
                                <NavLink
                                    key={obj.id}
                                    to={obj.href}
                                    title={obj.title}
                                    className={classActive}>
                                    <li className={s.list__item}>
                                        {obj.icon}
                                        <h2>
                                            {obj.title}
                                        </h2>
                                        {

                                            obj?.count ?
                                                <span className={s.quantity}>
                                                    {obj.count}
                                                    {console.log(obj.count)}
                                                </span>
                                                :
                                                ""
                                        }
                                    </li>
                                </NavLink>
                                :
                                <Notification
                                    key={obj.id}
                                    title={obj.title}
                                    classItem={s.list__item}
                                    classQuantity={s.quantity}
                                    count={obj.count}
                                />

                    ))}
                </ul>
                {/*<div className='project__development'>*/}
                {/*    <span>Проект в разработке <BsPersonWorkspace/></span>*/}
                {/*</div>*/}
            </nav>


        </div>

    )

}

export default Navigation