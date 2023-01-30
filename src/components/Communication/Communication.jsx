import s from "./Communication.module.scss";
import Message from "../Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {reDate} from "../actions/reDate";
import {logDOM} from "@testing-library/react";

const Communication = () => {
	
	const dispatch = useDispatch()
	let message = useSelector(state => state.message.message)
	const myId = useSelector(state => state.user.aboutUser.id)
	
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
							obj.type === 'Date' ?
								<Message
									key={index*5}
									message={obj.message}
									who={'Date'}
								/> :
							obj.sender.pk === myId ?
								<Message
									key={obj.id}
									message={obj.message}
									time={obj.time}
									who={'recipient'}
								/>
								:
								obj.recip.pk === myId ?
									<Message
										key={obj.id}
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