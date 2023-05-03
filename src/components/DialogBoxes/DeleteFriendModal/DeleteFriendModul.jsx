import React from 'react';
import {Dialog} from "@headlessui/react";
import {useDispatch, useSelector} from "react-redux";
import s from './DeleteFriendModal.module.scss'
import {deleteFriend} from "../../../redux/slices/navigationSlice";
import {AnimatePresence, motion} from "framer-motion";
import {useDeleteFriendsMutation} from "../../features/friendsApiSlice";

const DeleteFriendModal = () => {
    const dispatch = useDispatch()

    const deleteFriendFlag = useSelector(state => state.navigation.deleteFriend)
    const deleteFriendObj = useSelector(state => state.navigation.deleteFriendObj)
    const [deleteFriends] = useDeleteFriendsMutation()
    const deleteFriendFunc = async () => {
        await deleteFriends(deleteFriendObj.pk)
    }


    return (
        <AnimatePresence>
            {deleteFriendFlag && (<Dialog
                open={deleteFriendFlag}
                onClose={() => {}}
            >
                <motion.div
                    initial={{
                        y: -100,
                    }}
                    animate={{
                        y: 0,
                    }}
                    exit={{
                        y: -100,
                    }}
                    className={'dialog__overlay'}>
                    <Dialog.Panel className={s.wrapper__content}>
                        <Dialog.Title>
                            Удалить из
                            друзей <span>{deleteFriendObj.first_name + ' ' + deleteFriendObj.last_name}</span>?
                        </Dialog.Title>
                        <div className={s.content}>
                            <button onClick={deleteFriendFunc}>Да</button>
                            <button onClick={() => dispatch(deleteFriend({flag: false, obj: {}}))}>Нет</button>
                        </div>
                    </Dialog.Panel>
                </motion.div>
            </Dialog>)}
        </AnimatePresence>
    );
};

export default DeleteFriendModal;
