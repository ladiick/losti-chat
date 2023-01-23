import s from "./PeopleItem.module.scss";
import photo from "../assets/my_photo.jpg";


const PeopleItem = () => {
	
	return (
		<div className={s.block__people__item}>
			<div className={s.info__message}>
				<img src={photo} alt='avatar'/>
				
					<div className={s.name__lastMessage}>
						<h2>Vasya Pupkin</h2>
						<p>Hello</p>
					</div>
					
					<div className={s.wrapper__time}>
						<p className={s.time}>Today</p>
						{/*<span className={s.quantity__message}>2</span>*/}
						<span>1</span>
					
					</div>
				
			</div>
		
		</div>
	
	
	)
	
}

export default PeopleItem