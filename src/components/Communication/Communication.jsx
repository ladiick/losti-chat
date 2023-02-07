import s from "./Communication.module.scss";
import Message from "../Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useRef, useState} from "react";
import {setMessage} from "../../redux/slices/messageSlice";
import _ from "underscore";
import {MyContext} from "../../App";


const Communication = () => {
	const dispatch = useDispatch()
	let message = useSelector(state => state.message.message)
	const myId = useSelector(state => state.user.aboutUser.id)
	const people = useSelector(state => state.people.people)
	const peopleCurrentId = useSelector(state => state.people.peopleCurrent.pk)
	
	const {newMessage} = useContext(MyContext);
	
	
	useEffect(() => {
		
		if (newMessage) {
			const arr1 = [newMessage.recip.pk, newMessage.sender.pk].sort()
			const chat = [myId, peopleCurrentId].sort()
			
			let ind = people.findIndex(obj => {
				return _.isEqual([obj.sender.pk, obj.recip.pk].sort(), chat)
			})
			if (ind !== -1) {
				const arr2 = [people[ind].recip.pk, people[ind].sender.pk].sort()
				const isEqual = _.isEqual(arr1, arr2)
				
				if (isEqual) {
					dispatch(setMessage(newMessage))
				}
			}
		}
		
	}, [newMessage]);
	
	
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