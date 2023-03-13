import React from 'react';
import s from './ListFriendsProfileItem.module.scss'
import {HOST} from "../api/HOST";
import {changeColor} from "../actions/changeColor";
const ListFriendsProfileItem = ({obj,index}) => {
    return (
        <div className={s.wrapper__item}>
            {obj?.friend?.image ?
                <img src={`${HOST + obj?.friend?.image}`} alt="avatar"/>
            :
                <span className={s.empty__img} style={{backgroundColor: changeColor(index)}}
                >{obj?.friend?.first_name[0]}</span>
            }
            <span className={s.friend__name}>{obj.friend?.first_name}</span>
        </div>
    );
};

export default ListFriendsProfileItem;