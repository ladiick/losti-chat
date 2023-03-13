import React from 'react';
import s from "./OutputFriends.module.scss";
import FriendsItem from "../FriendsItem/FriendsItem";

const OutputFriends = ({data, searchValue}) => {
    return (
        <div className={s.block__friends}>
            {searchValue ?
                data.filter(obj => (
                    obj.friend.first_name.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    obj.friend.last_name.toLowerCase().includes(searchValue.toLowerCase())
                )).map((obj, index) => <FriendsItem key={obj.id} obj={obj} index={index}/>)
                :
                data.map((obj, index) => <FriendsItem key={obj.id} obj={obj} index={index} />)
            }
        </div>
    );
};

export default OutputFriends;