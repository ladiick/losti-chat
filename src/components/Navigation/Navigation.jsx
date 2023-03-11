import s from './Navigation.module.scss'
import photo from '../assets/my_photo.jpg'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {motion} from 'framer-motion'
import {BiMessageRounded} from "react-icons/bi";
import {BsPeople, BsPersonCircle, BsPersonWorkspace} from "react-icons/bs";
import {MdOutlineLogout} from 'react-icons/md'
import {ImEnter} from "react-icons/im";
import React from "react";
import logo from '../assets/logo.svg'
import {CgProfile} from "react-icons/cg";
const Navigation = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const classActive = ({isActive}) => isActive ? s.active : ''

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

                // duration: 0.5

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

                    {isAuth ?
                        <NavLink to='/profile' title='Профиль' className={classActive}>
                            <li className={s.list__item}>
                                <CgProfile/>
                                <h2>
                                    Моя страница
                                </h2>
                            </li>
                        </NavLink>
                        :
                        <NavLink to='/registration' className={classActive}>
                            <li className={s.list__item}>
                                <BsPersonCircle/>
                                <h2>
                                    Зарегистрироваться
                                </h2>
                            </li>
                        </NavLink>
                    }

                    {
                        isAuth &&
                        <NavLink to='/' title='Сообщения' className={classActive}>
                            <li className={s.list__item}>
                                <BiMessageRounded/>
                                <h2>
                                    Сообщения
                                </h2>
                            </li>
                        </NavLink>}

                    {
                        isAuth &&
                        <NavLink to='/friends' title='Друзья' className={classActive}>
                            <li className={s.list__item}>
                                <BsPeople/>
                                <h2>
                                    Друзья
                                </h2>
                            </li>
                        </NavLink>}


                    {isAuth ?
                        <NavLink to='/logout' title='Выход' className={classActive}>
                            <li className={s.list__item}>
                                <MdOutlineLogout/>
                                <h2>
                                    Выход
                                </h2>

                            </li>

                        </NavLink>

                        :
                        <NavLink to='/authorization' title='Авторизоваться' className={classActive}>
                            <li className={s.list__item}>
                                <ImEnter/>
                                <h2>
                                    Войти
                                </h2>
                            </li>
                        </NavLink>
                    }
                </ul>
                <div className='project__development'>
                    <span>Проект в разработке <BsPersonWorkspace/></span></div>

            </nav>


        </motion.div>

    )

}

export default Navigation