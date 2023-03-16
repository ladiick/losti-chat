import React from 'react';
import {Popover} from "@headlessui/react";
import s from './Notification.module.scss'
import {IoNotificationsOutline} from "react-icons/io5";
import {motion} from 'framer-motion'

const Notification = ({title, className}) => {

    return (
        <Popover className={s.popover__wrapper}>
            {({open}) => (
                <>
                    <Popover.Button>
                        <li className={className} style={open ? {background: '#1A73E8'} : {}}>
                            <IoNotificationsOutline/>
                            <h2>
                                {title}
                            </h2>
                        </li>
                    </Popover.Button>

                    <Popover.Panel className={s.popover__panel}>

                        <ul className={s.list__notification}>
                            <li className={s.item__notification}>
                                <h4>Какое-то уведомление</h4>
                            </li>
                        </ul>
                    </Popover.Panel>
                </>
            )}
        </Popover>
    );
};

export default Notification;
