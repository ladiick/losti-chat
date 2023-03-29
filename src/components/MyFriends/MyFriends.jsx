import s from './MyFriends.module.scss'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FriendsItem from "../FriendsItem/FriendsItem";
import SearchBlock from "../SearchBlock/SearchBlock";
import {Link} from "react-router-dom";
import {searchFriend} from "../../redux/slices/navigationSlice";
import Modul from "../DialogBoxes/Modul/Modul";
import {motion} from 'framer-motion'
import {useGetFriendsQuery} from "../features/friendsApiSlice";
import OutputFriends from "../OutputFriends/OutputFriends";
import DeleteFriendModal from "../DialogBoxes/DeleteFriendModal/DeleteFriendModul";
import ActionButton from "../ui/ActionButton/ActionButton";

function MyFriends() {

    const dispatch = useDispatch()
    const [searchValue, setSearch] = useState('');
    const {data = []} = useGetFriendsQuery()
    const deleteFriend = useSelector(state => state.navigation.deleteFriend)
    const modal = useSelector(state => state.navigation.modal)
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
                    У вас нет друзей! <span onClick={() => dispatch(searchFriend(true))}>Cкорее добавьте их</span>
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
            {modal && <Modul/>}
            {deleteFriend && <DeleteFriendModal/>}
            <header>

                <ActionButton
                    style={{cursor:'default'}}
                    second={true}>Все друзья {data?.length}</ActionButton>

                <ActionButton
                    onClick={() => dispatch(searchFriend(true))}>Найти друзей</ActionButton>
            </header>
            <SearchBlock searchValue={searchValue} setSearch={setSearch}/>
            <OutputFriends data={data} searchValue={searchValue}/>
        </motion.div>

    );
}


export default MyFriends;