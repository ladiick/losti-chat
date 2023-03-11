import React from 'react';
import s from "./PossibleFriendsItem.module.scss";
import photo from "../assets/my_photo.jpg";
import BtnAddFriend from "../BtnAddFriend/BtnAddFriend";
import {changeColor} from "../actions/changeColor";

const changeDeclination = (count) => {
    const count2 = count
    const arrDecl = ['общий друг', 'oбщих друга', 'общих друзей']

    count = Math.abs(count) % 100;
    let num = count % 10;
    if (count > 10 && count < 20) return `${count2} ${arrDecl[2]}`;
    if (num > 1 && num < 5) return `${count2} ${arrDecl[1]}`;
    if (num === 1) return `${count2} ${arrDecl[0]}`;
    return `${count2} ${arrDecl[2]}`;
}

const PossibleFriendsItem = ({obj, handlerPeople,index}) => {


    return (
        <div className={s.wrapper__people}>
            <div className={s.about__user}>
                {
                    obj.possible_friend.image ?
                        <img src={obj.possible_friend.image} alt="avatar"/>
                        :
                        <span className={s.empty__img}
                              style={{backgroundColor: changeColor(index)}}
                        >{obj.possible_friend?.first_name[0]}{obj.possible_friend?.last_name[0]}</span>

                }

                <div className={s.user__info}>
                    <h3>{obj.possible_friend.first_name} {obj.possible_friend.last_name}</h3>
                    <span>{changeDeclination(obj.count)}</span>
                </div>
            </div>
            <BtnAddFriend handlerPeople={handlerPeople}/>
        </div>
    );
};

export default PossibleFriendsItem;
