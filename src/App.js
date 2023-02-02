import React from "react";
import './App.css';
import {Routes, Route} from "react-router-dom";
import Main from "./Pages/Main/Main";
import Authorization from "./Pages/Authorization/Authorization";
import Registration from "./Pages/Registration/Registration";
import {Logout} from "./components/Logout/Logout";
import {setAboutUser, setUserRefreshToken, setUserAccessToken, setIsAuth} from "./redux/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useEffect} from "react";
import PeopleItem from "./components/PeopleItem/PeopleItem";
import { io } from 'socket.io-client'

function App() {
	
	const dispatch = useDispatch()
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
	
	useEffect(()=>{
	
	},[])
	
	useEffect(() => {
		// dispatch(setUserAccessToken(localStorage.getItem('accessToken')))
		// dispatch(setUserRefreshToken(localStorage.getItem('refreshToken')))
		if (userAccessToken) {
			
			const getMySelf = async () => {
				await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me/', {
					headers: {Authorization: `JWT ${userAccessToken}`}
				})
					.then(res => {
						dispatch(setAboutUser(res.data))
						dispatch(setIsAuth(true))
					})
					.catch((error) => {
						if(error.response.status === 401) {
							axios.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
								refresh: userRefreshToken
							}).then(res => {
								localStorage.setItem('accessToken', res.data.access)
								dispatch(setUserAccessToken(localStorage.getItem('accessToken')))
							})
						}
					})
				
			}
			
			getMySelf()
		}
		
	}, [userAccessToken]);
	
	
	return (
		
		<Routes>
			<Route path='/' element={<Main/>}/>
			<Route path='/authorization' element={<Authorization/>}/>
			<Route path='/registration' element={<Registration/>}/>
			<Route path='/:messageId' element={<PeopleItem />}/>
			<Route path='/logout' element={<Logout />}/>
		</Routes>
	);
}

export default App;
