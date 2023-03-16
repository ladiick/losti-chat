import s from './Chat.module.scss'
import Communication from "../Communication/Communication";
import {useSelector} from "react-redux";
import message__logo from '../assets/messages.svg'
import {useSearchParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import favorite from '../assets/favorite.svg'
import {MyContext} from "../../App";
import {motion} from 'framer-motion'
import {HOST} from "../api/HOST";
import {Oval} from "react-loader-spinner";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import {useGetCurrentPersonQuery} from "../features/currentPeopleApiSlice";
import {AiOutlinePaperClip} from "react-icons/ai";
import {BsSend, BsSendSlash} from "react-icons/bs";
import SceletonHeader from "./SceletonHeader";

const Chat = () => {

    const myId = useSelector(state => state.user.aboutUser.id)
    const {socket, statusSocket} = useContext(MyContext);
    const [searchParams, setSearchParams] = useSearchParams()

    const {data: peopleCurrent = {}, isLoading} = useGetCurrentPersonQuery(searchParams.get('dialogs'))
    //**custom-input
    const [content, setContent] = useState("")
    const refSend = useRef()
    const onContentChange = useCallback(evt => {
        const sanitizeConf = {
            allowedTags: ["b", "i", "a", "p"],
            allowedAttributes: {a: ["href"]}
        };
        if (evt.currentTarget.innerHTML.length > 20000) {
            setContent()
        }
        setContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf))
    }, [])


    //**

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

    const sendMessage = () => {

        if (content === '') {
            return
        }


        const countMessage = Math.ceil(content.length / 4000)
        for (let i = 0; i < countMessage; i++) {

            socket?.send(
                JSON.stringify(
                    {
                        request_id: new Date().getTime(),
                        message: content.slice(i * 4000, i * 4000 + 4000),
                        action: 'create_dialog_message',
                        recipient: searchParams.get('dialogs'),
                    }
                )
            )
        }
        setContent('')

    }
    const handlerKeyDown = (e) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault()
            refSend.current.click()
        }
    }


    if (!searchParams.get('dialogs')) {
        return (
            <div className={s.emptity__chat}>
                <div className={s.emptity__content}>
                    <img src={message__logo} alt='message'/>
                    <span>Выберите чат</span>
                </div>
            </div>
        )
    }

    const HeaderChat = () => {
        if (isLoading) {
            return (
                <SceletonHeader/>
            )
        }


        return (
            <>
                {searchParams.get('dialogs') === myId ?
                    <img
                        src={favorite}
                        alt="logo"/> :
                    peopleCurrent.image ?
                        <img
                            src={`${HOST + peopleCurrent.image}`}
                            alt="logo"/>
                        :
                        <span className={s.empty__img}
                        >{peopleCurrent?.first_name?.[0]}{peopleCurrent?.last_name?.[0]}</span>

                }
                <div className={s.person__info}>
                    <h1>
                        {searchParams.get('dialogs') === myId ? 'Избранное' : `${peopleCurrent.first_name} ${peopleCurrent.last_name}`} </h1>
                    {/*<p>Online</p>*/}
                </div>
            </>
        )
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -50
            }}
            animate={{
                opacity: 1,
                x: 0
            }}

            className={s.wrapper}>
            <header className={s.header}>
                <div className={s.left__side}>
                    <HeaderChat/>
                </div>
                <div className={s.right_side}>
                </div>
            </header>

            <Communication/>

            <div className={s.wrapper__input}>
                <div className={s.input}>
                    <div className={s.form__wrapper}>
                        <label className={s.download__file}>
                            <AiOutlinePaperClip/>
                            <input type='file' className={s.input__file}/>
                        </label>

                        <div className={s.block__input__message}>
                            <ContentEditable
                                html={content}
                                onKeyDown={handlerKeyDown}
                                contentEditable={true}
                                className={s.input__message}
                                role='textbox'
                                onChange={onContentChange}
                            />
                            {
                                content === '' && <motion.span
                                    initial={{
                                        x: 20,
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: 0,
                                        opacity: 1
                                    }}
                                    className={s.placeholder}>Напишите сообщение...</motion.span>
                            }
                        </div>

                        {
                            statusSocket === 'ready'
                                ?
                                <div
                                    ref={refSend}
                                    onClick={sendMessage}
                                    className={s.button__send}>
                                    <BsSend/>
                                </div>
                                :
                                <div className={s.button__send}>
                                    <BsSendSlash/>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Chat