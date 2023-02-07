import {configureStore} from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import people from './slices/peopleSlice'
import message from "./slices/messageSlice";
import socket from "./slices/socketSlice";
export const store = configureStore({
	
	
	reducer:{
		user,
		people,
		message,
		socket
	}
})