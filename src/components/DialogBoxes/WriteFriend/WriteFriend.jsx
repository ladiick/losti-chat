import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './WriteFriend.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../../redux/slices/navigationSlice";
import photo from '../../assets/my_photo.jpg'
import {MyContext} from "../../../App";
import {setFriendsCurrent} from "../../../redux/slices/friendsSlice";
import {toast} from "react-toastify";
import {Dialog} from "@headlessui/react";
import {AnimatePresence, motion} from 'framer-motion'
import {HOST} from "../../api/HOST";
import {optionsNotification} from "../../actions/optionsNotification";
import EmptyImage from "../../ui/EmptyImage/EmptyImage";
import Text from '../../ui/Text/Text'
import ActionButton from "../../ui/ActionButton/ActionButton";
import {IoClose} from "react-icons/io5";
import CloseButton from "../../ui/CloseButton/CloseButton";
import ModalDialog from "../../ui/Modal/ModalDialog";

const WriteFriend = () => {

	const dispatch = useDispatch()
	const friendsCurrent = useSelector(state => state.friends.friendsCurrent)
	const modalActive = useSelector(state => state.navigation.modal.writeFriend)
	const refTextArea = useRef(null);
	const {socket} = useContext(MyContext);
	const [textArea, setTextArea] = useState('');

	useEffect(() => {

		if (modalActive) {
			refTextArea?.current?.focus()
		}

	}, [modalActive])

	const closeFunc = () => {
		dispatch(setFriendsCurrent({}))
		dispatch(openModalBlock({writeFriend:false}))
	}
	const onSubmit = (e) => {
		e.preventDefault()
		if (textArea === '') return

		socket?.send(
			JSON.stringify(
				{
					request_id: new Date().getTime(),
					message: textArea,
					action: 'create_dialog_message',
					recipient: friendsCurrent.friend.pk,
				}
			)
		)
		toast.success('Сообщение отправлено', optionsNotification);
		setTextArea('')
		dispatch(openModalBlock(false))
		dispatch(setFriendsCurrent({}))
	}


	return (
		<ModalDialog
			open={modalActive}
			closeFunc={closeFunc}
			title='Написать сообщение'>

			<div className={s.wrapper__info__user}>
				<EmptyImage
					image={friendsCurrent?.friend?.image}
					name={{
						firstName: friendsCurrent?.friend?.first_name,
						lastName: friendsCurrent?.friend?.last_name
					}}
					style={{width: 50, height: 50, marginRight: 10}}
				/>

				<div className={s.info__user}>
					<Text
						weight='strong'>{friendsCurrent?.friend?.first_name} {friendsCurrent?.friend?.last_name}</Text>
				</div>
			</div>
			<form className={s.form}>
							<textarea
								value={textArea}
								maxLength="4000"
								onChange={e => setTextArea(e.target.value)}
								cols="40" rows="8" ref={refTextArea}/>
				<ActionButton
					onClick={onSubmit}
					style={{marginTop: 20, alignSelf: 'flex-end'}}>Отправить</ActionButton>
			</form>

		</ModalDialog>
	)
};

export default WriteFriend;
