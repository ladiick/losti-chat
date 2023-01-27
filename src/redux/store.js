import {configureStore} from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import people from './slices/peopleSlice'
import message from "./slices/messageSlice";
export const store = configureStore({
	
	
	reducer:{
		user,
		people,
		message
	}
})