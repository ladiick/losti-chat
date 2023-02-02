import s from "./Communication.module.scss";
import Message from "../Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef,useState} from "react";

import {setMessage} from "../../redux/slices/messageSlice";



const Communication = ({socket}) => {
	const dispatch = useDispatch()
	let message = useSelector(state => state.message.message)
	const myId = useSelector(state => state.user.aboutUser.id)
	
	
	
	useEffect(() => {
		const messageHandler = (e)=>{
			let newMessage = JSON.parse(e.data)
			newMessage = newMessage.data
			dispatch(setMessage(newMessage))
		}
		socket?.addEventListener('message',messageHandler)
		return ()=>{
			socket?.removeEventListener('message',messageHandler)
		}
	}, [socket]);
	
	
	
	
	let message2 = [...message]

	useEffect(() => {
		message2 = [...message]
	}, [message])
	
	return (
		<>
			
			<div className={s.block__messages}>
				{
					message2.reverse().map((obj, index) =>
						(
							
							 obj?.type === 'Date' ?
								<Message
									key={index}
									message={obj.message}
									who={'Date'}
								/> :
							obj.sender.pk === myId ?
								<Message
									key={index}
									message={obj.message}
									time={obj.time}
									who={'recipient'}
									
								/>
								:
								obj.recip.pk === myId ?
									<Message
										key={index}
										message={obj.message}
										time={obj.time}
										who={'sender'}
										
									/>
									: ''
									
						)
					)
					
				}
			</div>
		</>
	
	
	)
	
}

export default Communication