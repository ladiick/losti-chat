import React from 'react';
import s from './Gallery.module.scss'
import {HiOutlinePhotograph} from "react-icons/hi";
import photo from '../assets/my_photo.jpg'
import {BsPlus} from "react-icons/bs";
import {MdKeyboardArrowRight} from "react-icons/md";
import {ActionButton} from "../ui/ActionButton/ActionButton";
import WrapperBlocks from "../ui/WrapperBlocks/WrapperBlocks";

const Gallery = () => {
	return (
		<WrapperBlocks className={s.wrapper__gallery}>
			<ActionButton
				leftIcon={<HiOutlinePhotograph/>}
				second
				style={{display: 'inline-flex', alignItems: 'center'}}>
				Фото
			</ActionButton>
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
		</WrapperBlocks>
	);
};

export default Gallery;