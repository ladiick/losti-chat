import React from 'react';
import s from './HeaderForwardMessage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {changeDeclination} from "../../actions/changeDeclination";
import {IoClose} from "react-icons/io5";
import {BsTrash3} from "react-icons/bs";
import ActionButton from "../../ui/ActionButton/ActionButton";
import {clearForwardMessage, clearMessage} from "../../../redux/slices/messageSlice";
import useMatchMedia from "../../hooks/useMatchMedia";
import {forwardMessageFlag} from "../../../redux/slices/navigationSlice";
import {useSearchParams} from "react-router-dom";

const HeaderForwardMessage = () => {
    const currentMessage = useSelector(state => state.message.currentMessage)
    const dispatch = useDispatch()
    const {isMobile} = useMatchMedia()
    const [searchParams, setSearchParams] = useSearchParams()
    const param = searchParams.get('dialogs')

    const answerMessage = () => {
        console.log(currentMessage)
    }
    const forwardMessage = ()=>{
        dispatch(forwardMessageFlag(true))
    }

    const clearSelectMessage = ()=>{
        dispatch(clearMessage({param:searchParams.get('dialogs')}))
        dispatch(clearForwardMessage({param:searchParams.get('dialogs')}))
    }

    return (
        <header className={s.header}>
            <span className={s.left__side}>
                 {isMobile && 'Выбрано'} {changeDeclination(currentMessage?.[param]?.length, 'message')}
                <IoClose
                className={s.close}
                onClick={() => clearSelectMessage()}/>
            </span>
            <div className={s.right__side}>
                <BsTrash3 style={!isMobile ? {marginRight: 10} : {marginLeft: 10}}/>
                <div style={{display: 'flex'}}>
                    <ActionButton style={{marginRight: 10}}
                                  onClick={answerMessage}>Ответить</ActionButton>
                    <ActionButton onClick={forwardMessage}>Переслать</ActionButton>
                </div>
            </div>
        </header>
    );
};

export default HeaderForwardMessage;
