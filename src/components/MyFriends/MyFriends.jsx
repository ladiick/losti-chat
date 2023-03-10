import s from './MyFriends.module.scss'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FriendsItem from "../FriendsItem/FriendsItem";
import SearchBlock from "../SearchBlock/SearchBlock";
import {Link} from "react-router-dom";
import {searchFriend} from "../../redux/slices/navigationSlice";
import Modul from "../Modul/Modul";
import {motion} from 'framer-motion'
import {useGetFriendsQuery} from "../features/friendsApiSlice";
import OutputFriends from "../OutputFriends/OutputFriends";

function MyFriends() {

    const dispatch = useDispatch()
    const [searchValue, setSearch] = useState('');
    const {data=[]} = useGetFriendsQuery()


    if (data.length === 0) {
        return (
            <motion.div
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
                className={s.wrapper}>
                <div className={s.friends__empty}>
                    У вас нет друзей! <Link to=''>Cкорее добавьте их</Link>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
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
            className={s.wrapper}>
            <Modul/>
            <header>
                <div className={s.quantity__friends}>
                    <p>Все друзья</p>
                    <span>{data?.length}</span>
                </div>
                <div className={s.search__friends} onClick={() => dispatch(searchFriend(true))}>
                    <span>Найти друзей</span>
                </div>
            </header>
            <SearchBlock searchValue={searchValue} setSearch={setSearch}/>
            <OutputFriends data={data} searchValue={searchValue}/>
        </motion.div>

    );
}


export default MyFriends;