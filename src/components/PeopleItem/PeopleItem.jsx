import s from "./PeopleItem.module.scss";
import photo from "../assets/my_photo.jpg";
import {useSelector} from "react-redux";


const PeopleItem = ({firstName, lastName, message, time, img}) => {
	
	
	const reTime = (time) => {
		
		const currentTime = new Date()
		// const currentDay = currentTime.getDay()
		// const currentMonth = currentTime.getMonth() + 1
		// const currentYear = currentTime.getFullYear()
		const messageTime = new Date(time)
		// const messageDay = messageTime.getDay()
		// const messageMonth = messageTime.getMonth() + 1
		// const messageYear = messageTime.getFullYear()
		let generalTime = null
		if(currentTime.getDay() === messageTime.getDay()){
			generalTime = `${messageTime.getHours()}:${messageTime.getMinutes()}`
		}
		return generalTime
		
	}
	
	return (
		
		
		<div className={s.block__people__item}>
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