import React from 'react';
import s from './NavigateFriends.module.scss'
import {NavLink, useLocation} from "react-router-dom";
import {motion} from 'framer-motion'
import {useGetFriendsRequestsQuery} from "../features/friendsRequestsApiSlice";
import Text from '../ui/Text/Text'

const NavigateFriends = () => {
    const location = useLocation()
    const classActive = ({isActive}) => isActive ? s.active : ''
    const {data: friendRequests = []} = useGetFriendsRequestsQuery()

    return (
        <motion.nav
            initial={{
                y: -200,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            transition={{
                type: 'tween',
                duration: 0.5
            }}
            className={s.wrapper__nav}>
            <ul className={s.list__nav__items}>
                <li className={s.nav__items}>
                    <NavLink to='/friends'
                             title='Мои друзья'
                             className={location.pathname === '/friends' && classActive}>
                        <Text>Мои друзья</Text>
                    </NavLink>
                </li>
                <li className={s.nav__items}>
                    <NavLink to='requests' title='Заявки в друзья'
                             className={classActive}>
                        <Text>Заявки в друзья</Text>
                        {
                            friendRequests?.length === 0 ? "" :
                                <span className={s.quantity__requests}>{friendRequests?.length}</span>
                        }
                    </NavLink>
                </li>
                <li className={s.nav__items}>
                    <NavLink to='find'
                             title='Поиск друзей'
                             className={classActive}>
                        <Text>Поиск друзей</Text>
                    </NavLink>
                </li>
            </ul>
        </motion.nav>
    );
};

export default NavigateFriends;
