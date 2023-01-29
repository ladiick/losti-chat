import s from "./Communication.module.scss";
import Message from "../Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
const Communication = ()=>{
	
	const dispatch = useDispatch()
	let message = useSelector(state => state.message.message)
	const myId = useSelector(state => state.user.aboutUser.id)
	
	let message2 = [...message]
	
	useEffect(()=>{
		message2 = [...message]
	},[message])
	
	return(
		
		<div className={s.block__messages}>
			
			{
				message2.reverse().map(obj => obj.sender.pk === myId ?
						<Message
							key={obj.id}
							message={obj.message}
							time={obj.time}
							who={'recipient'}
							
						/>
						:
						<Message
							key={obj.id}
							message={obj.message}
							time={obj.time}
							who={'sender'}
							
						/>
					)
				
			}
		
		</div>
		
		
		
	)
	
}

export default Communication