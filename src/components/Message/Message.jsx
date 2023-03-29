import s from './Message.module.scss';
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {reTime} from "../actions/reTime";
import {BsCheckCircleFill} from "react-icons/bs";
import {MdEdit} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {changeActiveMessage} from "../../redux/slices/messageSlice";
import _ from "underscore";

const TimeFunc = (time) => {

    const messageTime = new Date(time)

    if (messageTime.getHours() === 0) {
        if (messageTime.getMinutes() < 10) {
            return `0${messageTime.getHours()}:0${messageTime.getMinutes()}`
        }
        return `0${messageTime.getHours()}:${messageTime.getMinutes()}`
    }

    if (messageTime.getMinutes() < 10) {
        return `${messageTime.getHours()}:0${messageTime.getMinutes()}`
    }
    return `${messageTime.getHours()}:${messageTime.getMinutes()}`
}

const Message = ({message, obj, time, who, handlerCurrentMessage}) => {
    const refScrollBlock = useRef(null);
    const currentMessage = useSelector(state => state.message.currentMessage)

    useEffect(() => {
        refScrollBlock.current.scrollIntoView(false)
    }, [])


    const activeMessage = useMemo(() => {
        const index = currentMessage.findIndex(message => _.isEqual(message, obj))
        if (index !== -1) {
            return true
        } else {
            return false
        }

    }, [currentMessage])


    return (
        <>

            <div
                onClick={() => {
                    handlerCurrentMessage()
                }}
                style={
                    who === 'sender' ? {textAlign: 'left'}
                        : who === 'recipient' ? {textAlign: 'right'}
                            : who === 'Date' ? {textAlign: 'center'}
                                : {}

                }
                className={who !== 'Date' &&
                activeMessage
                    ? s.message__wrapper__active
                    : who === 'Date' ?
                        s.message__enter_date : s.message__wrapper}>
                {who !== 'Date' &&
                    <div className={who === 'recipient' ? s.current__message__left : s.current__message__right}
                         style={activeMessage ? {display: 'flex'} : {}}
                    >
                        <BsCheckCircleFill style={who === 'sender' ? {margin: '0 10px'} : {}}/>
                        <MdEdit
                            title='Редактировать'
                            style={who === 'recipient' ?
                                {
                                    marginLeft: 10,
                                    color: 'var(--decription-color)'
                                } : {color: 'var(--decription-color)'}}/>
                    </div>}
                <span
                    className={
                        who === 'sender' ? s.message__left : who === 'recipient' ? s.message__right : s.enterDate
                    }>
                {who === 'Date' ? <span className={s.date__block}>{reTime(message)}</span> : message}
                    <div className={who === 'sender' ? s.message__info__left : s.message__info__right}>
					<span ref={refScrollBlock} className={s.message__day}>{who !== 'Date' && TimeFunc(time)}</span>
				</div>
			</span>


            </div>
            <span ref={refScrollBlock} className={s.scroll__block}></span>
        </>
    )
}

export default React.memo(Message)




