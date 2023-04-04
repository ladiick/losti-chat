import React from 'react';
import s from './MessageDate.module.scss'
import {reTime} from "../../actions/reTime";
const MessageDate = ({wrapper,message}) => {

    return (
        <>
            <div className={`${wrapper} ${s.message__enter_date}`}>
                <span className={s.date__block}>
                    {reTime(message)}
                {/*    <div className={s.message__info}>*/}
                {/*    <span className={s.message__day}>{reTime(message)}</span>*/}
                {/*</div>*/}
            </span>
            </div>
        </>
    );
};

export default MessageDate;
