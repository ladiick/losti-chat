import React, {useState} from 'react';
import s from "./MenuFriends.module.scss";
import {BsThreeDots} from "react-icons/bs";
import WrapperBlocks from "../../ui/WrapperBlocks/WrapperBlocks";
import Text from "../../ui/Text/Text";
import MenuOnHover from "../../ui/MenuOnHover/MenuOnHover";
import {deleteFriend} from "../../../redux/slices/navigationSlice";
import {useDispatch} from "react-redux";


const MenuFriends = ({friend}) => {

	const [onHovered, setOnHovered] = useState();
	const dispatch = useDispatch()
	const deleteFriendFunc = () => {
		dispatch(deleteFriend({flag: true, obj: friend?.friend}))
	}

	return (

		<MenuOnHover
			style={{right: 0}}
			onHovered={setOnHovered}
			className={s.wrapper__menu}
			onHover={
				<BsThreeDots
					color={onHovered ? 'var(--color--text--main)' : 'var(--icon--secondary)'}
					size={24}/>
			}>

			<ul className={s.list}>
				<li className={s.item}>
					<Text style={{cursor: 'pointer'}} onClick={deleteFriendFunc}>Удалить из друзей</Text>
				</li>
			</ul>

		</MenuOnHover>

	);
};

export default MenuFriends;
