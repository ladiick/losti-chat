import React from 'react';import s from './NotFound.module.scss'import notFound from '../assets/notFound.svg'const NotFound = () => {    return (        <div className={s.notFound}>            <div className={s.notFound__content}>                <img src={notFound} alt='not found'/>                <span>Страница не найдена</span>            </div>        </div>    );};export default NotFound;