import s from './Chat.module.scss'
import photo from '../assets/photo.svg'
import Communication from "../Communication/Communication";
import {useSelector} from "react-redux";
import message__logo from '../assets/messages.svg'
import {useForm} from "react-hook-form";
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useRef} from "react";
import favorite from '../assets/favorite.svg'
import {MyContext} from "../../App";

const Chat = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const peopleCurrent = useSelector(state => state.people.peopleCurrent)
    const status = useSelector(state => state.message.status)
    const myId = useSelector(state => state.user.aboutUser.id)
    const {dialogsId} = useParams()
    const {register, handleSubmit, reset} = useForm()
    const {socket, statusSocket} = useContext(MyContext);

    // const refInput = useRef(null);
    //
    // useEffect(()=>{
    // 	console.log(refInput.current)
    // 	if(peopleCurrent.pk) refInput.current.focus()
    //
    // },[peopleCurrent.pk])
    //
    const sendMessage = (data) => {
        console.log(data)
        if (!data.message) {
            return
        }

        socket?.send(
            JSON.stringify(
                {
                    request_id: new Date().getTime(),
                    message: data.message,
                    action: 'create_dialog_message',
                    recipient: dialogsId,

                }
            )
        )

        reset()

    }


    if (!isAuth) {
        return (
            <div className={s.notAuth}>

                <div className={s.wrapper__notAuth}>

                    <h1>
                        Приветствую!
                        <span>Необходимо войти или зарегистрироваться</span>
                        {/*<svg viewBox="0 0 128 128">*/}
                        {/*	<path*/}
                        {/*		d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"/>*/}
                        {/*	<path*/}
                        {/*		d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z"/>*/}
                        {/*</svg>*/}
                    </h1>

                    <div className={s.links}>
                        <Link to='/authorization'>Войти</Link>
                        <Link to='/registration'>Зарегистрироваться</Link>
                    </div>
                </div>

            </div>

        )
    }

    if (!dialogsId) {
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
            <header className={s.header}>
                <div className={s.left__side}>
                    <img src={dialogsId === myId ? favorite : peopleCurrent.image ? peopleCurrent.image : photo}
                         alt="logo"/>
                    <div className={s.person__info}>
                        <h1>
                            {dialogsId === myId ? 'Избранное' : `${peopleCurrent.first_name} ${peopleCurrent.last_name}`} </h1>
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
                            placeholder='Напишите сообщение...'
                            {...register('message')}
                            autoComplete={'off'}

                        />
                        <button className={s.button__send} disabled={statusSocket === 'pending'}>
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M22.984.638a.5.5,0,0,0-.718-.559L1.783,10.819a1.461,1.461,0,0,0-.1,2.527h0l4.56,2.882a.25.25,0,0,0,.3-.024L18.7,5.336a.249.249,0,0,1,.361.342L9.346,17.864a.25.25,0,0,0,.062.367L15.84,22.3a1.454,1.454,0,0,0,2.19-.895Z"/>
                                <path
                                    d="M7.885,19.182a.251.251,0,0,0-.385.211c0,1.056,0,3.585,0,3.585a1,1,0,0,0,1.707.707l2.018-2.017a.251.251,0,0,0-.043-.388Z"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat