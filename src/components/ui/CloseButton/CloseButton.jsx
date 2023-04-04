import React from 'react';
import {IoClose} from "react-icons/io5";
import s from './CloseButton.module.scss'
const CloseButton = ({...props}) => {

    return (
        <IoClose {...props} className={props.className ? `${props.className} ${s.close}` : s.close}/>
    );
};

export default CloseButton;
