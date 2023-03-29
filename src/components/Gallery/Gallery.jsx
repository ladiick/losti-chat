import React from 'react';
import s from './Gallery.module.scss'
import {HiOutlinePhotograph} from "react-icons/hi";
import photo from '../assets/my_photo.jpg'
import {BsPlus} from "react-icons/bs";
import {MdKeyboardArrowRight} from "react-icons/md";
import ActionButton from "../ui/ActionButton/ActionButton";

const Gallery = () => {
    return (
        <div className={s.wrapper__gallery}>
            <ActionButton
                second
                style={{display:'inline-flex',alignItems: 'center',padding: 6}}>
                <HiOutlinePhotograph
                    style={{marginRight: 5,fontSize: 20}}/> Фото</ActionButton>
            <div className={s.block__photos}>
                <img src={photo} alt=""/>
                <img src={photo} alt=""/>
                <img src={photo} alt=""/>
            </div>
            <div className={s.block__button}>
                <button>
                <BsPlus/> Загрузить фото
                    </button>
                <button>
                    Показать всё <MdKeyboardArrowRight/>
                    </button>
            </div>
        </div>
    );
};

export default Gallery;