import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './Modul.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../redux/slices/navigationSlice";
import photo from '../assets/my_photo.jpg'
import {MyContext} from "../../App";
import {setCurrentPeopleAll} from "../../redux/slices/peopleSlice";
import friends, {setFriendsCurrent, setFriendsCurrentPk} from "../../redux/slices/friendsSlice";

const Modul = () => {
	
	const dispatch = useDispatch()
	const friendsCurrent = useSelector(state => state.friends.friendsCurrent)
	const modalActive = useSelector(state => state.navigation.modal)
	const refTextArea = useRef(null);
	const {socket} = useContext(MyContext);
	const [textArea, setTextArea] = useState('');
	
	useEffect(() => {
		console.log('njgg')
		if(modalActive) {
			refTextArea.current.focus()
		}

	},[modalActive])
	const onSubmit = (e) =>{
		e.preventDefault()
		if(textArea === '') return
		
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
		
		setTextArea('')
		dispatch(openModalBlock(false))
		dispatch(setFriendsCurrent({}))
	}
	
	
	return (
		<>
			<div className={modalActive ? s.overlay__active : s.overlay}
			     onClick={() => {
				     dispatch(setFriendsCurrent({}))
				     dispatch(openModalBlock(false))
			     }}>
				<div className={s.wrapper__content}
				     onClick={(e) => e.stopPropagation()}>
					<header>
						<h2>Новое сообщение</h2>
					</header>
					<div className={s.content}>
						<div className={s.wrapper__info__user}>
							<img src={friendsCurrent?.friend?.image ? friendsCurrent?.friend?.image : photo} alt='logo'/>
							<div className={s.info__user}>
								<h3>{friendsCurrent?.friend?.first_name} {friendsCurrent?.friend?.last_name}</h3>
							</div>
						</div>
						<form onSubmit={onSubmit}>
							<textarea
								value={textArea}
								onChange={e=>setTextArea(e.target.value)}
								cols="40" rows="5" ref={refTextArea}/>
							<button>Отправить</button>
						</form>
					</div>
				</div>
			</div>
		
		</>
	);
};

export default Modul;
