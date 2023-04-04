import React, {useState} from 'react';
import s from './FriendsFind.module.scss'
import SearchBlock from "../SearchBlock/SearchBlock";
import AllPeopleItem from "../AllPeopleItem/AllPeopleItem";
import {useGetAllPeopleQuery} from "../features/findPeopleApiSlice";
import {useAcceptFriendRequestsMutation} from "../features/friendsApiSlice";
import {toast} from "react-toastify";
import {optionsNotification} from "../actions/optionsNotification";
import useMatchMedia from "../hooks/useMatchMedia";
const FriendsFind = () => {
    const [searchValue, setSearch] = useState('');
    const {isMobile} = useMatchMedia()

    const {data: allPeople = []} = useGetAllPeopleQuery()
    const [acceptFriendRequests, {isError}] = useAcceptFriendRequestsMutation()

    const handlerPeople = async (index, obj) => {
        try {
            await acceptFriendRequests({
                second_user: obj.pk
            }).unwrap()

            toast.success('Заявка отправлена', optionsNotification);
        } catch (err) {
            toast.error('Ошибка, заявка не отправлена, попробуйте позже', optionsNotification);
        }

    }

    return (
        <div className={s.wrapper__find}>
            <header className={s.header}>
                Поиск друзей
            </header>
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
        </div>
    );
};

export default FriendsFind;
