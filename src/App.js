import React from "react";
import './App.css';
import {Routes, Route} from "react-router-dom";
import Main from "./Pages/Main/Main";
import Authorization from "./Pages/Authorization/Authorization";
import Registration from "./Pages/Registration/Registration";
import {setAboutUser, setUserRefreshToken, setUserAccessToken} from "./redux/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useEffect} from "react";

function App() {
	
	const dispatch = useDispatch()
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
	
	useEffect(() => {
		dispatch(setUserAccessToken(localStorage.getItem('accessToken')))
		dispatch(setUserRefreshToken(localStorage.getItem('refreshToken')))
		if (userAccessToken) {
			
			const getMySelf = async () => {
				await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me/', {
					headers: {Authorization: `JWT ${userAccessToken}`}
				})
					.then(res => {
						dispatch(setAboutUser(res.data))
					})
					.catch(() => {
						axios.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
							refresh: userRefreshToken
						}).then(res => {
							console.log(res.data)
							localStorage.setItem('accessToken', res.data.access)
							dispatch(setUserAccessToken(localStorage.getItem('accessToken')))
						})
						
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
		
		</Routes>
	);
}

export default App;
