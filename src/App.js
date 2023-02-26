import axios from 'axios'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import './normalize.css'
import {updateAccessToken} from './components/actions/updateAccessToken'
import {HOST} from './components/api/HOST'
import useWebsocket from './components/hooks/useWebsocket'
import {Logout} from './components/Logout/Logout'
import Authorization from './Pages/Authorization/Authorization'
import Friends from './Pages/Friends/Friends'
import Main from './Pages/Main/Main'
import Profile from './Pages/Profile/Profile'
import Registration from './Pages/Registration/Registration'
import {
	setAboutUser,
	setIsAuth,
	setUserAccessToken,
} from './redux/slices/userSlice'
import {toast, ToastContainer} from "react-toastify";

export const MyContext = React.createContext()

function App() {
	const dispatch = useDispatch()
	const userAccessToken = useSelector(state => state.user.tokens.access)
	const userRefreshToken = useSelector(state => state.user.tokens.refresh)
	
	const [socket, statusSocket, newMessage] = useWebsocket(userAccessToken)
	
	const isAuth = useSelector(state => state.user.isAuth)
	
	useEffect(() => {
		if (userAccessToken) {
			const getMySelf = async () => {
				try {
					const res = await axios.get(`http://${HOST}/api/v1/auth/users/me/`, {
						headers: {Authorization: `JWT ${userAccessToken}`},
					})
					dispatch(setAboutUser(res.data))
					dispatch(setIsAuth(true))
					
				} catch (err) {
					console.log(err)
					if (err.response.status === 401) {
						const token = await updateAccessToken(userRefreshToken)
						console.log('token in App', token)
						dispatch(setUserAccessToken(token))
					}
				}
			}
			getMySelf()
		}
	}, [userAccessToken])
	
	return (
		<>
			<MyContext.Provider value={{socket, statusSocket, newMessage}}>
				
				<Routes>
					<Route path='/' element={<Main/>}/>
					<Route path='/friends/*' element={<Friends/>}/>
					<Route path='/authorization' element={<Authorization/>}/>
					<Route path='/profile' element={<Profile/>}/>
					<Route path='/registration/*' element={<Registration/>}/>
					<Route path='/logout' element={<Logout/>}/>
				</Routes>
			</MyContext.Provider>
			<ToastContainer
				position="top-center"
				autoClose={1500}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	)
}

export default App
