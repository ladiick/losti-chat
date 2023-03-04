import React, {useEffect, useState} from 'react';
import s from './SearchFriends.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {searchFriend} from "../../redux/slices/navigationSlice";
import SearchBlock from "../SearchBlock/SearchBlock";
import AllPeopleItem from "../AllPeopleItem/AllPeopleItem";
import axios from "axios";
import {HOST} from "../api/HOST";
import {findPeople, setAddFriend, setCurrentPeopleAll} from "../../redux/slices/peopleSlice";
import {Dialog} from "@headlessui/react";
import {motion} from 'framer-motion'

const SearchFriends = () => {
    const [searchValue, setSearch] = useState('');

    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.navigation.searchFriend)
    const people = useSelector(state => state.people.peopleAll)
    const userAccessToken = useSelector((state) => state.user.tokens.access)
    const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
    const isAuth = useSelector(state => state.user.isAuth)


    useEffect(() => {
        if (isAuth && userAccessToken) {
            dispatch(findPeople({userAccessToken, userRefreshToken}))
        }
        return () => {
            dispatch(setCurrentPeopleAll({}))

        }
    }, [isAuth, userAccessToken]);

    const handlerPeople = (index, obj) => {
        axios.post(`http://${HOST}/api/v1/friends/`, {
                second_user: obj.pk
            },
            {
                headers: {Authorization: `JWT ${userAccessToken}`},
            }).then(res => {
            dispatch(setAddFriend(index))

        })
    }


    return (
        <Dialog open={isVisible} onClose={() => dispatch(searchFriend(false))}>
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0
                }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}
                className={s.dialog__overlay}>
                <Dialog.Panel className={s.wrapper__search__block}>
                    <Dialog.Title className={s.wrapper__title}>Поиск друзей</Dialog.Title>

                    <SearchBlock searchValue={searchValue} setSearch={setSearch}/>
                    <div className={s.list__allpeople}>

                        {people?.filter(obj => obj.first_name.toLowerCase().includes(searchValue.toLowerCase()) || obj.last_name.toLowerCase().includes(searchValue.toLowerCase())).map((obj, index) =>
                            <AllPeopleItem
                                key={obj.pk}
                                obj={obj}
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
