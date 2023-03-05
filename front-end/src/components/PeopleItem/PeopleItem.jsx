import s from "./PeopleItem.module.scss";
import photo from "../assets/my_photo.jpg";
import {useDispatch, useSelector} from "react-redux";
import {reTime} from "../actions/reTime";

import React, {useEffect} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {logDOM} from "@testing-library/react";
import {setCurrentPeople} from "../../redux/slices/peopleSlice";


const PeopleItem = ({firstName, lastName, message, time, img, id, handlerPeople, obj}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()


    useEffect(() => {
        if (searchParams.get('dialogs') == id) {
            dispatch(setCurrentPeople(obj))
        }
    }, [searchParams.get('dialogs')])

    return (
        <div className={s.main__wrapper}>
            <div
                onClick={handlerPeople}
                className={searchParams.get('dialogs') == id ? s.block__people__item__active : s.block__people__item}>
                <div className={s.info__message}>
                    <img src={img ? img : photo} alt='avatar'/>
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