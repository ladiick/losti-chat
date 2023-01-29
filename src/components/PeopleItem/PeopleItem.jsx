import s from "./PeopleItem.module.scss";
import photo from "../assets/my_photo.jpg";
import {useSelector} from "react-redux";


const PeopleItem = ({firstName, lastName, message, time, img, id, handlerPeople, handlerCurrentPeople}) => {
	
	
	const reTime = (time) => {
		const monthRus = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
		const currentTime = new Date()
		
		const messageTime = new Date(time)
		
		
		let generalTime = null
		if (currentTime.getDay() === messageTime.getDay()) {
			generalTime = `${messageTime.getHours()}:${messageTime.getMinutes()}`
		}
		
		if (currentTime.getDate() - 1 === messageTime.getDate()) {
			generalTime = `Вчера`
		}
		
		if (currentTime.getDay() - 1 !== messageTime.getDay() - 1) {
			generalTime = `${messageTime.getDate()} ${monthRus[messageTime.getMonth()]}`
		}
		
		return generalTime
		
	}
	
	const peopleChecked = useSelector(state => state.people.peopleChecked)
	
	return (
		
		<div
			onClick={handlerPeople}
			className={peopleChecked === id ? s.block__people__item__active : s.block__people__item}>
			<div className={s.info__message}>
				<img src={img ? img : photo} alt='avatar'/>
				<div className={s.name__lastMessage}>
					<h2>{firstName} {lastName}</h2>
					<p>{message}</p>
				</div>
				
				<div className={s.wrapper__time}>
					<p className={s.time}>{reTime(time)}</p>
					{/*<span className={s.quantity__message}>2</span>*/}
					<span>1</span>
				
				</div>
			
			</div>
		
		</div>
	
	
	)
	
}

export default PeopleItem