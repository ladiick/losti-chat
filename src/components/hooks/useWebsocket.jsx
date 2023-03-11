import React, {useEffect, useState} from 'react';
import {updatePeople} from "../../redux/slices/peopleSlice";
import {useDispatch, useSelector} from "react-redux";
import {HOST} from "../api/HOST";
import {toast} from "react-toastify";
import {updateAccessToken} from "../actions/updateAccessToken";
import {setUserAccessToken, setUserTokens} from "../../redux/slices/userSlice";

const useWebsocket = (userAccessToken) => {
	const dispatch = useDispatch()
	const [socket, setSocket] = useState(null)
	const [statusSocket, setStatusSocket] = useState('pending')
	const [newMessage, setNewMessage] = useState(null);
	const isAuth = useSelector(state => state.user.isAuth)
	const refresh = useSelector(state => state.user.tokens.refresh)
	const myId = useSelector(state => state.user.aboutUser.id)
	
	useEffect(() => {
		let ws = null
		
		const closeHandler = () => {

			console.log('соединение разорванно я в ахуе')

			toast.error('Соединение разорвано,\n пытаюсь подключится', {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})

			const token = updateAccessToken(refresh)
			localStorage.setItem('accessToken',token.access)
			dispatch(setUserAccessToken(token.access))

			setTimeout(()=>{
				createChannel()

			}, 3000)
		}
		const createChannel = () => {

			if(statusSocket === 'ready') return

			console.log('соединение установлено')
			ws?.removeEventListener('close', closeHandler)
			ws?.close()

			ws = new WebSocket(`ws://${HOST}/ws/chat/?token=${localStorage.getItem('accessToken')}`)

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
