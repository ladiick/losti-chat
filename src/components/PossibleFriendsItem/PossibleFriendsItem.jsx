import React from 'react';
import s from "./PossibleFriendsItem.module.scss";
import BtnAddFriend from "../BtnAddFriend/BtnAddFriend";
import EmptyImage from "../ui/EmptyImage/EmptyImage";
import {Link} from "react-router-dom";
import {changeDeclination} from "../actions/changeDeclination";


const PossibleFriendsItem = ({obj, handlerPeople,index}) => {

    return (
        <div className={s.wrapper__people}>
            <Link to={`/profile/${obj.possible_friend.pk}`} className={s.about__user}>
                <EmptyImage
                    image={obj?.possible_friend?.image}
                    firstName={obj.possible_friend?.first_name}
                    lastName={obj.possible_friend?.last_name}
                    index={index}
                    width={48}
                    height={48}
                    fontSize={20}
                    marginRight={15}
                />

                <div className={s.user__info}>
                    <h3>
                        {obj.possible_friend.first_name} {obj.possible_friend.last_name}
                    </h3>
                    <span>{changeDeclination(obj.count,'posFriend')}</span>
                </div>
            </Link>
            <BtnAddFriend handlerPeople={handlerPeople}/>
        </div>
    );
};

export default PossibleFriendsItem;
