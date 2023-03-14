import s from './Message.module.scss';
import {useEffect, useRef} from "react";
import {reTime} from "../actions/reTime";

const TimeFunc = (time) => {

    const messageTime = new Date(time)

    if(messageTime.getHours() === 0){
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

const Message = ({message, time, who}) => {

    const refScrollBlock = useRef(null);

    useEffect(() => {
        refScrollBlock.current.scrollIntoView(false)
    },[])


    return (
        <>

            <div style={
                who === 'sender' ? {textAlign: 'left'} : who === 'recipient' ? {textAlign: 'right'} : {textAlign: 'center'}

            }
                 className={who !== 'Date' ? s.message__wrapper : s.message__enter_date}>
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

export default Message




