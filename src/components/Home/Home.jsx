import React from 'react';
import s from './Home.module.scss'
import Navigation from "../Navigation/Navigation";
import {useSelector} from "react-redux";
import useMatchMedia from "../hooks/useMatchMedia";


const Home = ({children}) => {

    const chatActive = useSelector(state => state.navigation.chat)
    const {isMedia} = useMatchMedia()

    if (isMedia) {
        return (
            <div className={s.wrapper}>
                <div className={s.container}>
                    {!chatActive && <Navigation/>}
                    <div className={s.content}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Navigation/>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Home;
