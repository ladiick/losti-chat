import React from 'react';
import s from "./AllPeopleItem.module.scss"
import photo from "../assets/my_photo.jpg";
import BtnAddFriend from "../BtnAddFriend/BtnAddFriend";
import {changeColor} from "../actions/changeColor";
import {HOST} from "../api/HOST";

const AllPeopleItem = ({obj, handlerPeople,index}) => {
    return (
        <div className={s.wrapper__people}>
            <div className={s.about__user}>

                {obj.image ?
                    <img src={`${HOST+obj.image}`} alt="avatar"/>
                    :
                    <span className={s.empty__img}
                          style={{backgroundColor: changeColor(index)}}
                    >{obj.first_name[0]}{obj.last_name[0]}</span>
                }

                <h3>{obj.first_name} {obj.last_name}</h3>
            </div>
            <BtnAddFriend handlerPeople={handlerPeople}/>
        </div>
    );
};

export default AllPeopleItem;
