import React, {useEffect, useState} from 'react';
import {updatePeople} from "../../redux/slices/peopleSlice";
import {useDispatch, useSelector} from "react-redux";
import {HOST} from "../api/HOST";

const useWebsocket = (userAccessToken) => {
	const dispatch = useDispatch()
	const [socket, setSocket] = useState(null)
	const [statusSocket, setStatusSocket] = useState('pending')
	const [newMessage, setNewMessage] = useState(null);
	const isAuth = useSelector(state => state.user.isAuth)
	
	const myId = useSelector(state => state.user.aboutUser.id)
	
	useEffect(() => {
		let ws = null
		
		const closeHandler = () => {
			// alert('Chanel is closed')
			console.log('соединение разорванно я в ахуе')
			setTimeout(createChannel, 3000)
		}
		const createChannel = () => {
			
			console.log('соединение установлено')
			ws?.removeEventListener('close', closeHandler)
			ws?.close()
			
			ws = new WebSocket(`ws://${HOST}/ws/chat/?token=${userAccessToken}`)
			
			ws.addEventListener('close', closeHandler)
			setSocket(ws)
			
		}
		if (isAuth) {
			createChannel()
			return () => {
				ws.removeEventListener('close', closeHandler)
				ws.close()
			}
		}
		
	}, [isAuth,userAccessToken]);
	
	useEffect(() => {
		let openHandler = () => {
			setStatusSocket('ready')
		}
		
		socket?.addEventListener('open', openHandler)
		return () => {
			socket?.removeEventListener('open', openHandler)
		}
		
	}, [socket]);
	
	
	useEffect(() => {
		const messageHandler = (e) => {
			const newMessage2 = JSON.parse(e.data).data
			dispatch(updatePeople({data: newMessage2, myId: myId}))
			setNewMessage(newMessage2)
			
		}
		
		socket?.addEventListener('message', messageHandler)
		
		return () => {
			socket?.removeEventListener('message', messageHandler)
		}
	}, [socket]);
	
	
	return [socket, statusSocket, newMessage]
	
};

export default useWebsocket;
