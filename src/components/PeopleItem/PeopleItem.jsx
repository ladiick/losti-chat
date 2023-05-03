import s from "./PeopleItem.module.scss";
import noPhoto from "../assets/camera.svg";
import {useDispatch} from "react-redux";
import {reTime} from "../actions/reTime";

import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {setCurrentPeople} from "../../redux/slices/peopleSlice";
import {changeColor} from "../actions/changeColor";
import {HOST} from "../api/HOST";
import EmptyImage from "../ui/EmptyImage/EmptyImage";
import Text from "../ui/Text/Text";


const PeopleItem = ({online,flag, firstName, lastName, message, time, img, id, handlerPeople, obj, index}) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const classPeopleItem = searchParams.get('dialogs') == id ? s.block__people__item__active : s.block__people__item


	if (flag === 'forward') {
		return (
			<div className={s.main__wrapper} title={firstName + ' ' + lastName}>
				<div onClick={handlerPeople}
				     className={s.block__people__item}>
					<div className={s.info__message}>
						{firstName === 'Избранное' ?
							<img src={img} alt=""/>
							:
							<EmptyImage
								style={{width: 45, height: 45, marginRight: 10}}
								noOnline={online}
								index={index}
								image={img}
								name={{firstName, lastName}}
							/>}
						<div className={s.name__lastMessage}>
							<Text weight='strong' style={{cursor: 'pointer'}}>{firstName} {lastName}</Text>
						</div>
					</div>
				</div>
			</div>
		)
	}


	return (
		<div className={s.main__wrapper} title={firstName + ' ' + lastName}>
			<div
				onClick={handlerPeople}
				className={classPeopleItem}>
				<div className={s.info__message}>
					{firstName === 'Избранное' ?
						<img src={img} alt=""/>
						:
						<EmptyImage
							noOnline={online}
							style={{width: 45, height: 45}}
							index={index}
							image={img}
							name={{firstName, lastName}}
						/>}

					<div className={s.name__lastMessage}>
						<Text weight='strong' style={{cursor:'pointer'}}>{firstName} {lastName}</Text>
						<Text className={s.last__message} style={{cursor:'pointer'}}>{message}</Text>
					</div>
					<div className={s.wrapper__time}>
						<p className={s.time}>{reTime(time)}</p>
						{/*<span className={s.quantity__message}>2</span>*/}
						<span>1</span>
					</div>
				</div>
			</div>
		</div>

	)

}

export default PeopleItem