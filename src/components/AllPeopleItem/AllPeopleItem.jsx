import React from 'react';
import s from "./AllPeopleItem.module.scss"
import photo from "../assets/my_photo.jpg";
import BtnAddFriend from "../BtnAddFriend/BtnAddFriend";
const AllPeopleItem = ({obj,handlerPeople}) => {
	return (
		<div className={s.wrapper__people}>
			<div className={s.about__user}>
				<img src={obj.image ? obj.image : photo} alt="avatar"/>
				<h3>{obj.first_name} {obj.last_name}</h3>
			</div>
			<BtnAddFriend handlerPeople={handlerPeople} />
		</div>
	);
};

export default AllPeopleItem;
