import React from 'react';
import useMatchMedia from "../../components/hooks/useMatchMedia";
import s from './NotificationPage.module.scss'
const NotificationPage = () => {

    const {isMobile} = useMatchMedia()

    return (
        <div className={s.wrapper__notification}>
            <h1>Уведомления</h1>
            <div className={s.block__item}>

            </div>
        </div>
    );
};

export default NotificationPage;
