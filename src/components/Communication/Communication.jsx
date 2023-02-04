import s from "./Communication.module.scss";
import Message from "../Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";

import {setMessage} from "../../redux/slices/messageSlice";
import {updatePeople} from "../../redux/slices/peopleSlice";
import _ from "underscore";

//[people[index].recip.pk, people[index].sender.pk].includes(newMessage.sender.pk)
// 				&&
// 				[people[index].sender.pk, people[index].recip.pk].includes(newMessage.recip.pk)
const Communication = ({socket}) => {
	const dispatch = useDispatch()
	let message = useSelector(state => state.message.message)
	const myId = useSelector(state => state.user.aboutUser.id)
	const index = useSelector(state => state.people.index)
	const people = useSelector(state => state.people.people)
	useEffect(() => {
		const messageHandler = (e) => {
			// let _ = require('underscore')
			let newMessage = JSON.parse(e.data)
			newMessage = newMessage.data
			const arr1 = [newMessage.recip.pk,newMessage.sender.pk].sort()
			const arr2 = [people[index].recip.pk,people[index].sender.pk].sort()
			
			dispatch(updatePeople({data: newMessage}))
			const isEqual = _.isEqual(arr1,arr2)
			if(isEqual) {
				dispatch(setMessage(newMessage))
			}
			
		}
		socket?.addEventListener('message', messageHandler)
		return () => {
			socket?.removeEventListener('message', messageHandler)
		}
	}, [socket]);
	
	
	let message2 = [...message]
	
	useEffect(() => {
		message2 = [...message]
	}, [message])
	
	
	const refCommunication = useRef();
	
	return (
		<>
			
			<div className={s.block__messages} ref={refCommunication}>
				{
					message2.reverse().map((obj, index) =>
						(
							
							obj?.type === 'Date' ?
								<Message
									key={index}
									message={obj.message}
									who={'Date'}
									refCommunication={refCommunication.current}
								/> :
								obj?.sender.pk === myId ?
									<Message
										key={index}
										message={obj.message}
										time={obj.time}
										who={'recipient'}
										refCommunication={refCommunication.current}
									/>
									:
									obj?.recip.pk === myId ?
										<Message
											key={index}
											message={obj.message}
											time={obj.time}
											who={'sender'}
											refCommunication={refCommunication.current}
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