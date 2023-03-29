import React from 'react';
import s from "./AllPeopleItem.module.scss"
import BtnAddFriend from "../BtnAddFriend/BtnAddFriend";
import {changeColor} from "../actions/changeColor";
import {HOST} from "../api/HOST";
import EmptyImage from "../ui/EmptyImage/EmptyImage";

const AllPeopleItem = ({obj, handlerPeople,index}) => {
    return (
        <div className={s.wrapper__people}>
            <div className={s.about__user}>

                <EmptyImage
                    image={obj?.image}
                    firstName={obj?.first_name}
                    lastName={obj?.last_name}
                    index={index}
                    width={48}
                    height={48}
                    fontSize={20}
                    marginRight={15}
                />

                <h3>{obj?.first_name} {obj?.last_name}</h3>
            </div>
            <BtnAddFriend handlerPeople={handlerPeople}/>
        </div>
    );
};

export default AllPeopleItem;
