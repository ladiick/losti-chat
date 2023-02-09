import React, {useState} from "react";
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
import useWebsocket from "./components/hooks/useWebsocket";
import {updateAccessToken} from "./components/actions/updateAccessToken";
import Friends from "./Pages/Friends/Friends";

export const MyContext = React.createContext()

function App() {
	const dispatch = useDispatch()
	const userAccessToken = useSelector((state) => state.user.tokens.access)
	const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
	
	const [socket, statusSocket, newMessage] = useWebsocket(userAccessToken)
	
	const isAuth = useSelector(state => state.user.isAuth)
	
	
	useEffect(() => {
		if (userAccessToken) {
			const getMySelf = async () => {
				
				try {
					const res = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me/', {
						headers: {Authorization: `JWT ${userAccessToken}`}
					})
					dispatch(setAboutUser(res.data))
					dispatch(setIsAuth(true))
				} catch(err){
					console.log(err)
					if(err.response.status === 401){
						const token = await updateAccessToken(userRefreshToken)
						
						dispatch(setUserAccessToken(token))
						
					}
				}
				
				
			}
			getMySelf()
		
		}
		
	}, [userAccessToken]);
	
	
	
	return (
		<MyContext.Provider value={{socket,statusSocket,newMessage}}>
		<Routes>
			<Route path='/' element={<Main/>}/>
			<Route path='/friends' element={<Friends/>}/>
			<Route path='/authorization' element={<Authorization/>}/>
			<Route path='/registration' element={<Registration/>}/>
			<Route path='/logout' element={<Logout />}/>
		</Routes>
		</MyContext.Provider>
	);
}

export default App;
