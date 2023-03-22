import React, {useState} from 'react';
import s from './SearchFriends.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {searchFriend} from "../../redux/slices/navigationSlice";
import SearchBlock from "../SearchBlock/SearchBlock";
import AllPeopleItem from "../AllPeopleItem/AllPeopleItem";

import {Dialog} from "@headlessui/react";
import {motion} from 'framer-motion'
import {useGetAllPeopleQuery} from "../features/findPeopleApiSlice";
import {useAcceptFriendRequestsMutation} from "../features/friendsApiSlice";
import {toast} from "react-toastify";
import {FiArrowLeft} from "react-icons/fi";
import useMatchMedia from "../hooks/useMatchMedia";

const SearchFriends = () => {
    //*requests
    const {data: allPeople = []} = useGetAllPeopleQuery()
    const [acceptFriendRequests, {isError}] = useAcceptFriendRequestsMutation()
    //*requests
    const [searchValue, setSearch] = useState('');

    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.navigation.searchFriend)


    const handlerPeople = async (index, obj) => {
        try {
            await acceptFriendRequests({
                second_user: obj.pk
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
        } catch (err) {
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

    const {isMobile} = useMatchMedia()

    return (
        <Dialog open={isVisible} onClose={() => dispatch(searchFriend(false))}>
            <motion.div
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1
                }}
                transition={{
                    type: 'tween',
                    duration: 0.25
                }}
                className={s.dialog__overlay}>
                <Dialog.Panel className={s.wrapper__search__block}>
                    <Dialog.Title className={s.wrapper__title}>
                        {isMobile && <FiArrowLeft onClick={() => dispatch(searchFriend(false))}/>} Поиск друзей</Dialog.Title>

                    <SearchBlock searchValue={searchValue} setSearch={setSearch}/>
                    <div className={s.list__allpeople}>

                        {allPeople?.filter(obj => obj.first_name.toLowerCase().includes(searchValue.toLowerCase()) || obj.last_name.toLowerCase().includes(searchValue.toLowerCase())).map((obj, index) =>
                            <AllPeopleItem
                                key={obj.pk}
                                obj={obj}
                                index={index}
                                handlerPeople={() => handlerPeople(index, obj)}
                            />
                        )}

                    </div>
                </Dialog.Panel>


            </motion.div>
        </Dialog>
    );
};

export default SearchFriends;
