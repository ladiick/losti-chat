import s from './Chat.module.scss'
import Communication from "../Communication/Communication";
import {useSelector} from "react-redux";
import message__logo from '../assets/messages.svg'
import {useSearchParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {MyContext} from "../../App";
import {motion} from 'framer-motion'
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import {useGetCurrentPersonQuery} from "../features/currentPeopleApiSlice";
import {AiOutlinePaperClip} from "react-icons/ai";
import {BsSend, BsSendSlash} from "react-icons/bs";
import useMatchMedia from "../hooks/useMatchMedia";
import HeaderChat from "./HeaderChat/HeaderChat";
import BlockInputs from "./BlockInputs/BlockInputs";
import HeaderForwardMessage from "./HeaderForwardMessage/HeaderForwardMessage";

const Chat = () => {

    const myId = useSelector(state => state.user.aboutUser.id)
    const [searchParams, setSearchParams] = useSearchParams()
    const [skip, setSkip] = useState(true)
    const currentMessage = useSelector(state => state.message.currentMessage)

    const {isMobile} = useMatchMedia()



    const {data: peopleCurrent = {}, isLoading} = useGetCurrentPersonQuery(searchParams.get('dialogs'), {
        skip
    })

    useEffect(() => {
        if (searchParams.get('dialogs') != myId) {
            setSkip(pre => !pre)
        } else {
            setSkip(true)
        }

    }, [searchParams.get('dialogs')])


    useEffect(() => {
        const onKeypress = e => {
            if (e.code === 'Escape') {
                setSearchParams('')
            }
        }

        document?.addEventListener('keydown', onKeypress);

        return () => {
            document?.removeEventListener('keydown', onKeypress);
        };
    }, []);




    if (!searchParams.get('dialogs') && !isMobile) {
        return (
            <div className={s.emptity__chat}>
                <div className={s.emptity__content}>
                    <img src={message__logo} alt='message'/>
                    <span>Выберите чат</span>
                </div>
            </div>
        )
    }

    return (
        <div className={s.wrapper}>

            <HeaderChat myId={myId} isLoading={isLoading} peopleCurrent={peopleCurrent}/>

            <Communication/>

            {currentMessage.length && isMobile ? <HeaderForwardMessage/> : <BlockInputs/>}
        </div>
    )
}

export default Chat