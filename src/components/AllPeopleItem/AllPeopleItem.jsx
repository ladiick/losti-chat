import React from 'react';
import s from "./AllPeopleItem.module.scss"
import BtnAddFriend from "../BtnAddFriend/BtnAddFriend";
import {changeColor} from "../actions/changeColor";
import {HOST} from "../api/HOST";
import EmptyImage from "../ui/EmptyImage/EmptyImage";
import {Link} from "react-router-dom";

const AllPeopleItem = ({obj, handlerPeople, index}) => {
    return (
        <div className={s.wrapper__people}>
            <div className={s.about__user}>
                <Link to={`/profile/${obj?.pk}`}>
                    <EmptyImage
                        image={obj?.image}
                        name={{firstName: obj?.first_name, lastName: obj?.last_name}}
                        index={index}
                        style={{
                            width: 140,
                            height: 140,
                            fontSize: 32,
                            borderRadius: 8
                        }}
                    />
                </Link>
                <div className={s.wrapper__link}>
                    <Link to={`/profile/${obj?.pk}`}>
                        <span>{obj?.first_name} {obj?.last_name}</span>
                    </Link>

                    <BtnAddFriend
                        style={{padding:0,background:'transparent'}}
                        handlerPeople={handlerPeople}/>
                </div>
            </div>
        </div>
    );
};

export default AllPeopleItem;
