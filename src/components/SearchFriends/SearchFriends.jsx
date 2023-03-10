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

const SearchFriends = () => {
    //*requests
    const {data: allPeople = []} = useGetAllPeopleQuery()
    const [acceptFriendRequests,{isError}] = useAcceptFriendRequestsMutation()
    //*requests
    const [searchValue, setSearch] = useState('');

    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.navigation.searchFriend)



    const handlerPeople = async (index, obj) => {
        await acceptFriendRequests({
            second_user: obj.pk
        }).unwrap()
    }


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
                    <Dialog.Title className={s.wrapper__title}>Поиск друзей</Dialog.Title>

                    <SearchBlock searchValue={searchValue} setSearch={setSearch}/>
                    <div className={s.list__allpeople}>

                        {allPeople?.filter(obj => obj.first_name.toLowerCase().includes(searchValue.toLowerCase()) || obj.last_name.toLowerCase().includes(searchValue.toLowerCase())).map((obj, index) =>
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
