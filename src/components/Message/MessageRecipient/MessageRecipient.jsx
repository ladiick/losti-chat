import React, {useEffect, useRef} from 'react';
import s from "./MessageRecipient.module.scss";
import {BsCheckCircleFill} from "react-icons/bs";
import {MdEdit} from "react-icons/md";
import {convertTime} from "../../actions/convertTime";

const MessageRecipient = ({activeMessage, time, wrapper, message,handlerCurrentMessage}) => {
    const refScrollBlock = useRef(null);

    useEffect(() => {
        refScrollBlock?.current?.scrollIntoView(false)
    }, [])

    const classNameWrapper =
        activeMessage
            ? ` ${wrapper} ${s.wrapper__recipient} ${s.wrapper__recipient__active}`
            : `${wrapper} ${s.wrapper__recipient}`

    return (
        <>
            <div className={classNameWrapper} onClick={handlerCurrentMessage}>
                <div className={s.current__message__left}>
                    <BsCheckCircleFill/>
                    <MdEdit
                        title='Редактировать'
                        style={{ marginLeft: 10, color: 'var(--decription-color)'}}/>
                </div>
                <span className={s.message}>
                    {message}
                    <div className={s.message__info}>
                    <span className={s.message__day}>{convertTime(time)}</span>
                </div>
            </span>
            </div>
            <span ref={refScrollBlock} className={s.scroll__block}></span>
        </>
    );
};

export default MessageRecipient;
