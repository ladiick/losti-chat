import React from 'react'
import {useSelector} from 'react-redux'
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    useNavigate,
    useNavigation
} from 'react-router-dom'
import './App.scss'
import './normalize.css'

import useWebsocket from './components/hooks/useWebsocket'
import {Logout} from './components/Logout/Logout'
import Authorization from './Pages/Authorization/Authorization'
import Friends from './Pages/Friends/Friends'
import Profile from './Pages/Profile/Profile'
import Registration from './Pages/Registration/Registration'

import {ToastContainer} from "react-toastify";
import Dialogs from "./Pages/Dialogs/Dialogs";
import {Layout} from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import {BsPersonWorkspace} from "react-icons/bs";
import {useGetUserQuery} from "./components/features/userApiSlice";
import Settings from "./Pages/Settings/Settings";

export const MyContext = React.createContext()

const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
        <Route index element={<Dialogs/>}/>
        <Route path='friends/*' element={<Friends/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='edit' element={<Settings/>}/>

        <Route path='*' element={<NotFound/>}/>
    </Route>
    <Route path='/authorization' element={<Authorization/>}/>
    <Route path='/logout' element={<Logout/>}/>
    <Route path='/registration/*' element={<Registration/>}/>
    </>
))

function App() {

    const userAccessToken = useSelector(state => state.user.tokens.access)
    const [socket, statusSocket, newMessage] = useWebsocket(userAccessToken)

    useGetUserQuery()

    if(window.screen.width < 1140){
        return <h1 className='mobile__support'>На данный момент поддержки мобильных устройств нет😔<span> Идет разработка <BsPersonWorkspace/></span></h1>
    }

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
