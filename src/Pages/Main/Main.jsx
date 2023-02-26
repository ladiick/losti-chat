import { useDispatch, useSelector } from 'react-redux'
import Chat from '../../components/Chat/Chat'
import Home from '../../components/Home/Home'
import Social from '../../components/Social/Social'
import {ToastContainer} from "react-toastify";
import React from "react";

const Main = () => {
	
	return (
		<>
		<Home>
			<Social />
			<Chat />
		</Home>
			</>
	)
}

export default Main
