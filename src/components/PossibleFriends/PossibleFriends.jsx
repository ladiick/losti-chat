import React from 'react';
import s from "./PossibleFriends.module.scss"
import PossibleFriendsItem from "../PossibleFriendsItem/PossibleFriendsItem";
import {toast} from "react-toastify";
import {motion} from 'framer-motion'
import {useGetPossibleFriendsQuery} from "../features/friendsPossibleFriendsApiSlice";
import {useAcceptFriendRequestsMutation} from "../features/friendsApiSlice";
import {optionsNotification} from "../actions/optionsNotification";
import Title from "../ui/Title/Title";

const PossibleFriends = () => {

    const {data: possibleFriends = []} = useGetPossibleFriendsQuery()
    const [acceptFriendRequests, {isError}] = useAcceptFriendRequestsMutation()

    const handlerPeople = async (index, obj) => {
        try {
            await acceptFriendRequests({
                second_user: obj.possible_friend.pk
            }).unwrap()

            toast.success('Заявка отправлена', optionsNotification);
        } catch (err) {
            console.log(err)
            toast.error('Ошибка, заявка не отправлена, попробуйте позже', optionsNotification);
        }


    }
    if (possibleFriends.length === 0) {
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
            <Title style={{marginBottom:20}}>Возможные друзья</Title>
            <div className={s.block__scroll}>
                {
                    possibleFriends?.map((obj, index) => <PossibleFriendsItem
                        key={obj.possible_friend.pk}
                        obj={obj}
                        index={index}
                        handlerPeople={() => handlerPeople(index, obj)}
                    />)
                }

            </div>
        </motion.div>
    );
};

export default PossibleFriends;
