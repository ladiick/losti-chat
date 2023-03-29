import React from 'react';
import s from './HeaderForwardMessage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {changeDeclination} from "../../actions/changeDeclination";
import {IoClose} from "react-icons/io5";
import {BsTrash3} from "react-icons/bs";
import ActionButton from "../../ui/ActionButton/ActionButton";
import {clearMessage} from "../../../redux/slices/messageSlice";
import useMatchMedia from "../../hooks/useMatchMedia";

const HeaderForwardMessage = () => {
    const currentMessage = useSelector(state => state.message.currentMessage)
    const dispatch = useDispatch()
    const {isMobile} = useMatchMedia()

    const sendMessage = () => {
        console.log(currentMessage)
    }

    return (
        <header className={s.header}>
            <span className={s.left__side}>
                 {isMobile && 'Выбрано'} {changeDeclination(currentMessage.length, 'message')} <IoClose className={s.close}
                onClick={() => dispatch(clearMessage())}/>
            </span>
            <div className={s.right__side}>
                <BsTrash3 style={!isMobile ? {marginRight: 10} : {marginLeft: 10}}/>
                <div>
                    <ActionButton style={isMobile ? {marginRight: 10} : {marginLeft: 10}}
                                  onClick={sendMessage}>Ответить</ActionButton>
                    <ActionButton>Переслать</ActionButton>
                </div>
            </div>
        </header>
    );
};

export default HeaderForwardMessage;
