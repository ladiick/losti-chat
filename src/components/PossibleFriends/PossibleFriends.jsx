import React from 'react';
import {setAddFriend} from "../../redux/slices/peopleSlice";
import {useDispatch, useSelector} from "react-redux";
import s from "./PossibleFriends.module.scss"
import axios from "axios";
import {HOST} from "../api/HOST";
import PossibleFriendsItem from "../PossibleFriendsItem/PossibleFriendsItem";
import {toast} from "react-toastify";
import {motion} from 'framer-motion'
import {useGetPossibleFriendsQuery} from "../features/friendsPossibleFriendsApiSlice";
import {useAcceptFriendRequestsMutation} from "../features/friendsApiSlice";

const PossibleFriends = () => {

    const {data: possibleFriends = []} = useGetPossibleFriendsQuery()
    const [acceptFriendRequests,{isError}] = useAcceptFriendRequestsMutation()

    const handlerPeople = async (index, obj) => {
        try{

            await acceptFriendRequests({
                second_user: obj.friend.pk
            }).unwrap()

            toast.success('Заявка отправлена', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }catch(err){
            toast.error('Ошибка, заявка не отправлена, попробуйте позже', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }




    }
    if(possibleFriends.length === 0){
        return
    }

    return (
        <motion.div
            initial={{
                y: 200,
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
            <h1 className={s.title__block}>Возможные друзья</h1>

            {
                possibleFriends?.map((obj, index) => <PossibleFriendsItem
                    key={obj.possible_friend.pk}
                    obj={obj}
                    handlerPeople={() => handlerPeople(index, obj)}
                />)
            }

        </motion.div>
    );
};

export default PossibleFriends;
