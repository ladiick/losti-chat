import s from "./PeopleItem.module.scss";
import photo from "../assets/my_photo.jpg";
import {useDispatch, useSelector} from "react-redux";
import {reTime} from "../actions/reTime";
import {openModalBlock} from "../../redux/slices/navigationSlice";

const PeopleItem = ({firstName, lastName, message, time, img, id,friend, handlerPeople}) => {
	
	const dispatch = useDispatch()
	const peopleChecked = useSelector(state => state.people.peopleCurrent.pk)
	const peopleCheckedAll = useSelector(state => state.people.peopleCurrentAll.pk)
	
	
	return (
		
		<div
			onClick={handlerPeople}
			className={peopleChecked === id || peopleCheckedAll === id? s.block__people__item__active : s.block__people__item}>
			<div className={s.info__message}>
				<img src={img ? img : photo} alt='avatar'/>
				<div className={s.name__lastMessage}>
					<h2>{firstName} {lastName}</h2>
					{
						friend !== 'friend'?
						<p>{message}</p>
					:
							<span
								className={s.writeAMessage}
								onClick={()=>dispatch(openModalBlock(true))}>Написать сообщение</span>
					}
				</div>
				
				<div className={s.wrapper__time}>
					{
						friend !== 'friend' ?
						<p className={s.time}>{reTime(time, 'people')}</p>
					:
							''
					}
					{/*<span className={s.quantity__message}>2</span>*/}
					<span>1</span>
				
				</div>
			
			</div>
		
		</div>
	
	
	)
	
}

export default PeopleItem