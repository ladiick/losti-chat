import React from 'react';
import s from "./NavigationItem.module.scss";
import Text from "../../ui/Text/Text";
import {NavLink} from "react-router-dom";
import useMatchMedia from "../../hooks/useMatchMedia";
import Notification from "../../Notification/Notification";
import {styleText} from "../../../utils/utils";


const NavigationItem = ({obj, index}) => {
    const classActive = ({isActive}) => isActive ? s.active : ''
    const {isMobile} = useMatchMedia()

    if(!obj.href && !isMobile){
        return (
            <Notification
                key={obj.id}
                title={obj.title}
                classItem={s.list__item}
                classQuantity={s.quantity}
                count={obj.count}
            />
        )
    }

    return (
        <NavLink
            key={obj.id}
            to={isMobile && obj.title === 'Уведомления' ? '/notification' : obj.href}
            title={obj.title}
            className={classActive}>
            <li className={s.list__item}>
                {obj.icon}
                <Text style={styleText(isMobile)}>
                    {isMobile && index === 0 ?
                        'Профиль' : obj.title}
                </Text>
                {
                    obj?.count ?
                        <span className={s.quantity}>
                           {obj.count}
                        </span>
                        :
                        ""
                }
            </li>
        </NavLink>
    );
};


export default NavigationItem;
