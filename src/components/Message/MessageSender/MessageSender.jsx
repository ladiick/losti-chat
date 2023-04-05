import React, {useEffect, useRef} from 'react';
import s from './MessageSender.module.scss'
import {BsCheckCircleFill} from "react-icons/bs";
import {MdEdit} from "react-icons/md";
import {convertTime} from "../../actions/convertTime";
import {FaShare} from "react-icons/fa";

const MessageSender = ({activeMessage, time, wrapper, message, handlerCurrentMessage}) => {
    const refScrollBlock = useRef(null);

    useEffect(() => {
        refScrollBlock?.current?.scrollIntoView(false)
    }, [])


    const classNameWrapper =
        activeMessage
            ? ` ${wrapper} ${s.wrapper__sender} ${s.wrapper__sender__active}`
            : `${wrapper} ${s.wrapper__sender}`

    return (
        <>
            <div className={classNameWrapper} onClick={()=>handlerCurrentMessage()}>
                <div className={s.current__message__right}>
                    <BsCheckCircleFill style={{margin: '0 10px'}}/>
                    <FaShare
                        title='Ответить'
                        style={{color: 'var(--decription-color)'}}/>
                </div>
                <span className={s.message}>
                    {message}
                    <div className={s.message__info}>
                    <span>{convertTime(time)}</span>
                </div>
            </span>
            </div>
            <span ref={refScrollBlock} className={s.scroll__block}></span>
        </>
    );
};

export default MessageSender;
