import React, {useCallback, useContext, useRef, useState} from 'react';
import s from "./BlockInputs.module.scss";
import {AiOutlinePaperClip} from "react-icons/ai";
import ContentEditable from "react-contenteditable";
import {motion} from "framer-motion";
import {BsSend, BsSendSlash} from "react-icons/bs";
import sanitizeHtml from "sanitize-html";
import useMatchMedia from "../../hooks/useMatchMedia";
import {MyContext} from "../../../App";
import {useSearchParams} from "react-router-dom";

const BlockInputs = () => {
    const {isMobile} = useMatchMedia()
    const {socket, statusSocket} = useContext(MyContext);

    const [searchParams, setSearchParams] = useSearchParams()

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
        if (!e.shiftKey && e.key === 'Enter' && !isMobile) {
            e.preventDefault()
            refSend?.current?.click()
        }
    }
    return (
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


                    <div
                        ref={refSend}
                        onClick={sendMessage}
                        className={s.button__send}>
                        {statusSocket === 'ready' ? <BsSend/> : <BsSendSlash/>}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default BlockInputs;