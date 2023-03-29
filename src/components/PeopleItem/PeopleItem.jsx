import s from "./PeopleItem.module.scss";
import noPhoto from "../assets/camera.svg";
import {useDispatch} from "react-redux";
import {reTime} from "../actions/reTime";

import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {setCurrentPeople} from "../../redux/slices/peopleSlice";
import {changeColor} from "../actions/changeColor";
import {HOST} from "../api/HOST";
import EmptyImage from "../ui/EmptyImage/EmptyImage";


const PeopleItem = ({firstName, lastName, message, time, img, id, handlerPeople, obj, index}) => {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className={s.main__wrapper} title={firstName + ' ' + lastName}>
            <div
                onClick={handlerPeople}
                className={searchParams.get('dialogs') == id ? s.block__people__item__active : s.block__people__item}>
                <div className={s.info__message}>
                    {firstName === 'Избранное' ?
                        <img src={img} alt=""/>
                        :
                        <EmptyImage
                            width={45}
                            height={45}
                            index={index}
                            marginRight={10}
                            image={img}
                            firstName={firstName}
                            lastName={lastName}/>}

                    <div className={s.name__lastMessage}>
                        <h2>{firstName} {lastName}</h2>
                        <p>{message}</p>
                    </div>
                    <div className={s.wrapper__time}>
                        <p className={s.time}>{reTime(time)}</p>
                        {/*<span className={s.quantity__message}>2</span>*/}
                        <span>1</span>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default PeopleItem