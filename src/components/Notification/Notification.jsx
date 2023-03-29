import React from 'react';
import {Popover} from "@headlessui/react";
import s from './Notification.module.scss'
import {IoNotificationsOutline} from "react-icons/io5";
import {Link} from "react-router-dom";

const Notification = ({title, classItem, count, classQuantity}) => {

    return (

        <Popover className={s.popover__wrapper}>
            {({open}) => (
                <>
                    <Popover.Button>
                        <li className={classItem}>
                            <IoNotificationsOutline/>
                            <h2>
                                {title}
                            </h2>
                            <span className={classQuantity}>{count}</span>
                        </li>
                    </Popover.Button>

                    <Popover.Panel className={s.popover__panel}>
                        <ul className={s.list__notification}>
                            <li className={s.item__notification}>
                                <h4>Здесь будут уведомления</h4>
                            </li>
                        </ul>
                        <Link to='notification'>Показать все</Link>
                    </Popover.Panel>

                </>
            )}
        </Popover>
    );
};

export default Notification;
