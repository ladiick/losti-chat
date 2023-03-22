import React from 'react';
import s from './Gallery.module.scss'
import {HiOutlinePhotograph} from "react-icons/hi";
import photo from '../assets/my_photo.jpg'

const Gallery = () => {
    return (
        <div className={s.wrapper__gallery}>
            <span><HiOutlinePhotograph/> Фото</span>
            <div className={s.block__photos}>
                <img src={photo} alt=""/>
                <img src={photo} alt=""/>
                <img src={photo} alt=""/>
            </div>
        </div>
    );
};

export default Gallery;