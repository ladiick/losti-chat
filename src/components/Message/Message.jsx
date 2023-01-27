import s from './Message.module.scss';
import {useEffect,useRef} from "react";


const Message = ({message,time,who})=>{

	const reTime = (time)=>{
		const days = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС']
		
		const messageTime = new Date(time)
		if(messageTime.getMinutes() < 10){
			return `${days[messageTime.getDay()-1]} ${messageTime.getHours()}:0${messageTime.getMinutes()}`
		}
		return `${days[messageTime.getDay()-1]} ${messageTime.getHours()}:${messageTime.getMinutes()}`
		
		
	}
	const refBlock = useRef(null);
	
	useEffect(()=>{
		refBlock.current.scrollIntoView(false)
	},[])
	
	return(

		<div
			
			style={who === 'sender' ? {textAlign:'left'} : {textAlign: 'right'}}
			className={s.message__wrapper}>

			<span
				className={who === 'sender' ? s.message__left : s.message__right}>
				
				{message}
				<div
					ref={refBlock}
					className={who === 'sender' ? s.message__info__left : s.message__info__right}>
					<span className={s.message__day}>{reTime(time)}</span>
					{/*<span className={s.message__time}>{time}</span>*/}
				</div>
			</span>


		</div>
	)
}

export default Message




