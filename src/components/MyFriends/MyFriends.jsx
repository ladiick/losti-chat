import s from './MyFriends.module.scss'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FriendsItem from "../FriendsItem/FriendsItem";
import SearchBlock from "../SearchBlock/SearchBlock";
import {Link} from "react-router-dom";
import {searchFriend} from "../../redux/slices/navigationSlice";
import WriteFriend from "../DialogBoxes/WriteFriend/WriteFriend";
import {motion} from 'framer-motion'
import {useGetFriendsQuery} from "../features/friendsApiSlice";
import OutputFriends from "../OutputFriends/OutputFriends";
import DeleteFriendModal from "../DialogBoxes/DeleteFriendModal/DeleteFriendModul";
import ActionButton from "../ui/ActionButton/ActionButton";
import Title from "../ui/Title/Title";

function MyFriends() {

    const dispatch = useDispatch()
    const [searchValue, setSearch] = useState('');
    const {data = []} = useGetFriendsQuery()
    const deleteFriend = useSelector(state => state.navigation.deleteFriend)
    const modal = useSelector(state => state.navigation.modal.writeFriend)

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
            {modal && <WriteFriend/>}
            {deleteFriend && <DeleteFriendModal/>}
            <header className={s.header}>
                <ActionButton style={{cursor: 'default', pointerEvents: 'none'}}
                              second={true}>Все друзья {data?.length}
                </ActionButton>
                <Link to='/friends/find'>
                    <ActionButton>Найти друзей</ActionButton>
                </Link>
            </header>
            <SearchBlock searchValue={searchValue} setSearch={setSearch}/>
            <OutputFriends data={data} searchValue={searchValue}/>
        </motion.div>

    );
}


export default MyFriends;