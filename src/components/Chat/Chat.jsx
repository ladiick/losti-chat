import s from './Chat.module.scss'
import Communication from "../Communication/Communication";
import {useSelector} from "react-redux";
import message__logo from '../assets/messages.svg'
import {useForm} from "react-hook-form";
import {Link, useSearchParams} from "react-router-dom";
import {useContext, useEffect, useRef} from "react";
import favorite from '../assets/favorite.svg'
import {MyContext} from "../../App";
import {motion} from 'framer-motion'
import {HOST} from "../api/HOST";
import {Oval} from "react-loader-spinner";

const Chat = () => {

    const peopleCurrent = useSelector(state => state.people.peopleCurrent)

    const myId = useSelector(state => state.user.aboutUser.id)
    const {register, handleSubmit, reset} = useForm()
    const {socket, statusSocket} = useContext(MyContext);
    const [searchParams, setSearchParams] = useSearchParams()


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


    const sendMessage = (data) => {
        if (!data.message) {
            return
        }

        const countMessage = Math.ceil(data.message.length / 4000)
        for (let i = 0; i < countMessage; i++) {

            socket?.send(
                JSON.stringify(
                    {
                        request_id: new Date().getTime(),
                        message: data.message.slice(i * 4000, i * 4000 + 4000),
                        action: 'create_dialog_message',
                        recipient: searchParams.get('dialogs'),
                    }
                )
            )
        }

        reset()

    }


    if (!searchParams.get('dialogs')) {
        return (
            <div className={s.emptity__chat}>
                <div className={s.emptity__content}>
                    <img src={message__logo} alt='message'/>
                    <span>???????????????? ??????</span>
                </div>
            </div>
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
                            {searchParams.get('dialogs') === myId ? '??????????????????' : `${peopleCurrent.first_name} ${peopleCurrent.last_name}`} </h1>
                        {/*<p>Online</p>*/}
                    </div>
                </div>
                <div className={s.right_side}>
                    {/*<svg  enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32">*/}
                    {/*	<path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"/>*/}
                    {/*	<path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"/>*/}
                    {/*	<path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"/>*/}
                    {/*</svg>*/}

                </div>
            </header>


            <Communication/>

            <div className={s.wrapper__input}>
                <div className={s.input}>
                    <form onSubmit={handleSubmit(sendMessage)}>
                        <label className={s.download__file}>
                            <svg height="48" viewBox="0 0 48 48">
                                <path
                                    d="M33 12v23c0 4.42-3.58 8-8 8s-8-3.58-8-8v-25c0-2.76 2.24-5 5-5s5 2.24 5 5v21c0 1.1-.89 2-2 2-1.11 0-2-.9-2-2v-19h-3v19c0 2.76 2.24 5 5 5s5-2.24 5-5v-21c0-4.42-3.58-8-8-8s-8 3.58-8 8v25c0 6.08 4.93 11 11 11s11-4.92 11-11v-23h-3z"/>
                                <path d="M0 0h48v48h-48z" fill="none"/>
                            </svg>
                            <input type='file' className={s.input__file}
                                   {...register('files')}

                            />
                        </label>

                        <input
                            type="text"
                            placeholder='???????????????? ??????????????????...'
                            {...register('message')}
                            autoComplete={'off'}
                            autoFocus={true}
                            maxLength='20000'
                        />
                        {
                            statusSocket === 'ready'
                                ?

                                <button className={s.button__send} disabled={statusSocket === 'pending'}>
                                    <svg viewBox="0 0 24 24">
                                        <path
                                            d="M22.984.638a.5.5,0,0,0-.718-.559L1.783,10.819a1.461,1.461,0,0,0-.1,2.527h0l4.56,2.882a.25.25,0,0,0,.3-.024L18.7,5.336a.249.249,0,0,1,.361.342L9.346,17.864a.25.25,0,0,0,.062.367L15.84,22.3a1.454,1.454,0,0,0,2.19-.895Z"/>
                                        <path
                                            d="M7.885,19.182a.251.251,0,0,0-.385.211c0,1.056,0,3.585,0,3.585a1,1,0,0,0,1.707.707l2.018-2.017a.251.251,0,0,0-.043-.388Z"/>
                                    </svg>
                                </button>
                                :
                                <Oval
                                    height="24"
                                    width="24"
                                    color="#1A73E8"
                                    secondaryColor="#434343"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}
                                />
                        }
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default Chat