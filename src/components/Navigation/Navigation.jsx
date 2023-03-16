import s from './Navigation.module.scss'
import photo from '../assets/my_photo.jpg'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {motion} from 'framer-motion'
import {BiMessageRounded} from "react-icons/bi";
import {BsPeople, BsPersonCircle, BsPersonWorkspace} from "react-icons/bs";
import {MdOutlineLogout} from 'react-icons/md'
import {ImEnter} from "react-icons/im";
import React from "react";
import logo from '../assets/logo.svg'
import {CgProfile} from "react-icons/cg";
import {IoNotificationsOutline} from "react-icons/io5";
import Notification from "../Notification/Notification";

const authItems = [
    {
        id: 144,
        title: 'Моя страница',
        href: '/profile',
        icon: <CgProfile/>,
    },
    {
        id: 145,
        title: 'Сообщения',
        href: '/',
        icon: <BiMessageRounded/>,
    },
    {
        id: 146,
        title: 'Друзья',
        href: '/friends',
        icon: <BsPeople/>,
    },
    {
        id: 147,
        title: 'Уведомления',
        href: '',
        icon: <IoNotificationsOutline/>,
    },
    {
        id: 148,
        title: 'Выход',
        href: '/logout',
        icon: <MdOutlineLogout/>,
    },


]

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


    if (!isAuth) {
        return (
            <motion.div
                initial={{
                    x: -200,
                    opacity: 0
                }}
                animate={{
                    x: 0,
                    opacity: 1
                }}
                transition={{
                    type: 'tween',
                }}
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
                </nav>
            </motion.div>

        )
    }

    return (

        <motion.div
            initial={{
                x: -200,
                opacity: 0
            }}
            animate={{
                x: 0,
                opacity: 1
            }}
            transition={{
                type: 'tween',
            }}
            className={s.wrapper__navigation}>
            <nav className={s.nav__content}>
                <div className={s.name__company}>
					<span>
						<img src={logo} alt='logo'/>
						<h1>LOSTI-CHAT</h1>
					</span>
                </div>
                <ul className={s.list__items}>
                    {authItems.map(obj => (
                        obj.href ?
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
                                </li>
                            </NavLink>
                            :

                            <Notification key={obj.id} title={obj.title} className={s.list__item}/>

                    ))}
                </ul>
                <div className='project__development'>
                    <span>Проект в разработке <BsPersonWorkspace/></span></div>
            </nav>


        </motion.div>

    )

}

export default Navigation