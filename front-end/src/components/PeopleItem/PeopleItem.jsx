import s from "./PeopleItem.module.scss";
import photo from "../assets/my_photo.jpg";
import {useSelector} from "react-redux";
import {reTime} from "../actions/reTime";

import React from "react";
import {Link, useSearchParams} from "react-router-dom";
import {logDOM} from "@testing-library/react";


const PeopleItem = ({firstName, lastName, message, time, img, id, handlerPeople}) => {
	const [searchParams,setSearchParams] = useSearchParams()

	return (
		<div className={s.main__wrapper}>
			<div
				onClick={handlerPeople}
				className={searchParams.get('dialogs') == id ? s.block__people__item__active : s.block__people__item}>
				<div className={s.info__message}>
					<img src={img ? img : photo} alt='avatar'/>
					<div className={s.name__lastMessage}>
						<h2>{firstName} {lastName}</h2>
						<p>{message}</p>
					</div>
					<div className={s.wrapper__time}>
						<p className={s.time}>{reTime(time, 'people')}</p>
						{/*<span className={s.quantity__message}>2</span>*/}
						<span>1</span>
					</div>
				</div>
			</div>
		</div>
	
	)
	
}

export default PeopleItem