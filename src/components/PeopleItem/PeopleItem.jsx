import s from "./PeopleItem.module.scss";
import noPhoto from "../assets/camera.svg";
import {useDispatch} from "react-redux";
import {reTime} from "../actions/reTime";

import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {setCurrentPeople} from "../../redux/slices/peopleSlice";
import {changeColor} from "../actions/changeColor";
import {HOST} from "../api/HOST";


const PeopleItem = ({firstName, lastName, message, time, img, id, handlerPeople, obj,index}) => {
    const [searchParams, setSearchParams] = useSearchParams()


    return (
        <div className={s.main__wrapper}>
            <div
                onClick={handlerPeople}
                className={searchParams.get('dialogs') == id ? s.block__people__item__active : s.block__people__item}>
                <div className={s.info__message}>
                    {img ?
                        <img
                        src={img ? `${HOST+img}` : noPhoto} alt='avatar'/>
                    :
                        <span className={s.empty__img} style={{backgroundColor: changeColor(index)}}
                        >{firstName[0]}{lastName[0]}</span>
                    }
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