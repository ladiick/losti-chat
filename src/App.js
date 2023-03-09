import axios from 'axios'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './App.scss'
import './normalize.css'
import {updateAccessToken} from './components/actions/updateAccessToken'
import {HOST} from './components/api/HOST'
import useWebsocket from './components/hooks/useWebsocket'
import {Logout} from './components/Logout/Logout'
import Authorization from './Pages/Authorization/Authorization'
import Friends from './Pages/Friends/Friends'
import Profile from './Pages/Profile/Profile'
import Registration from './Pages/Registration/Registration'
import {
    setAboutUser,
    setIsAuth,
    setUserAccessToken,
} from './redux/slices/userSlice'
import {ToastContainer} from "react-toastify";
import Dialogs from "./Pages/Dialogs/Dialogs";
import {Layout} from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";

export const MyContext = React.createContext()

const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
        <Route index element={<Dialogs/>}/>
        <Route path='friends/*' element={<Friends/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Route>
    <Route path='/authorization' element={<Authorization/>}/>
    <Route path='/logout' element={<Logout/>}/>
    <Route path='/registration/*' element={<Registration/>}/>
    </>
))

function App() {
    const dispatch = useDispatch()
    const userAccessToken = useSelector(state => state.user.tokens.access)
    const userRefreshToken = useSelector(state => state.user.tokens.refresh)
    const isAuth = useSelector(state => state.user.isAuth)

    const [socket, statusSocket, newMessage] = useWebsocket(userAccessToken)


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
                    if (err.response.status === 401) {
                        const token = await updateAccessToken(userRefreshToken)
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
                <RouterProvider router={router}/>
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
                theme="light"
            />
        </>
    )
}

export default App
