import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './Modul.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../redux/slices/navigationSlice";
import photo from '../assets/my_photo.jpg'
import {MyContext} from "../../App";
import {setCurrentPeopleAll} from "../../redux/slices/peopleSlice";

const Modul = () => {
	
	const dispatch = useDispatch()
	const currentPeople = useSelector(state => state.people.peopleCurrentAll)
	const modalActive = useSelector(state => state.navigation.modal)
	const refTextArea = useRef(null);
	const {socket} = useContext(MyContext);
	const [textArea, setTextArea] = useState('');
	
	useEffect(() => {
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
					recipient: currentPeople.pk,
				}
			)
		)
		
		setTextArea('')
		dispatch(openModalBlock(false))
		dispatch(setCurrentPeopleAll({}))
	}
	
	
	return (
		<>
			<div className={modalActive ? s.overlay__active : s.overlay}
			     onClick={() => dispatch(openModalBlock(false))}>
				<div className={s.wrapper__content} onClick={(e) => e.stopPropagation()}>
					<header>
						<h2>Новое сообщение</h2>
					</header>
					<div className={s.content}>
						<div className={s.wrapper__info__user}>
							<img src={currentPeople.image ? currentPeople.image : photo} alt='logo'/>
							<div className={s.info__user}>
								<h3>{currentPeople.first_name} {currentPeople.last_name}</h3>
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
