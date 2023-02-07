import s from "./PeopleItem.module.scss";
import photo from "../assets/my_photo.jpg";
import {useSelector} from "react-redux";
import {reTime} from "../actions/reTime";
const PeopleItem = ({firstName, lastName, message, time, img, id, handlerPeople}) => {
	
	
	
	
	const peopleChecked = useSelector(state => state.people.peopleCurrent.pk)
	
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
					<p className={s.time}>{reTime(time,'people')}</p>
					{/*<span className={s.quantity__message}>2</span>*/}
					<span>1</span>
				
				</div>
			
			</div>
		
		</div>
	
	
	)
	
}

export default PeopleItem