import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './Modul.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../redux/slices/navigationSlice";
import photo from '../assets/my_photo.jpg'
import {MyContext} from "../../App";
import {setFriendsCurrent} from "../../redux/slices/friendsSlice";
import {toast} from "react-toastify";
import {Dialog} from "@headlessui/react";
import {AnimatePresence, motion} from 'framer-motion'

const Modul = () => {

    const dispatch = useDispatch()
    const friendsCurrent = useSelector(state => state.friends.friendsCurrent)
    const modalActive = useSelector(state => state.navigation.modal)
    const refTextArea = useRef(null);
    const {socket} = useContext(MyContext);
    const [textArea, setTextArea] = useState('');

    useEffect(() => {

        if (modalActive) {
            refTextArea.current.focus()
        }

    }, [modalActive])
    const onSubmit = (e) => {
        e.preventDefault()
        if (textArea === '') return

        socket?.send(
            JSON.stringify(
                {
                    request_id: new Date().getTime(),
                    message: textArea,
                    action: 'create_dialog_message',
                    recipient: friendsCurrent.friend.pk,
                }
            )
        )
        toast.success('Сообщение отправлено', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTextArea('')
        dispatch(openModalBlock(false))
        dispatch(setFriendsCurrent({}))
    }


    return (
        <Dialog open={modalActive} onClose={() => {
            dispatch(setFriendsCurrent({}))
            dispatch(openModalBlock(false))
        }}>
            <motion.div
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1
                }}
                transition={{
                    type:'tween',
                    duration: 0.25
                }}
                className={s.dialog__overlay}>
                <Dialog.Panel className={s.wrapper__content}>
                    <Dialog.Title className={s.dialog__title}>Новое сообщение</Dialog.Title>
                    <div className={s.content}>
                        <div className={s.wrapper__info__user}>
                            {friendsCurrent?.friend?.image
                                ?
                                <img src={friendsCurrent?.friend?.image ? friendsCurrent?.friend?.image : photo}
                                  alt='logo'/>
                            :
                                <span className={s.empty__img}
                                >{friendsCurrent?.friend?.first_name[0]}{friendsCurrent?.friend?.last_name[0]}</span>
                            }
                            <div className={s.info__user}>
                                <h3>{friendsCurrent?.friend?.first_name} {friendsCurrent?.friend?.last_name}</h3>
                            </div>
                        </div>
                        <form onSubmit={onSubmit}>
							<textarea
                                value={textArea}
                                maxLength="4000"
                                onChange={e => setTextArea(e.target.value)}
                                cols="40" rows="5" ref={refTextArea}/>
                            <button>Отправить</button>
                        </form>
                    </div>

                </Dialog.Panel>
            </motion.div
            >

        </Dialog>
    )
};

export default Modul;
