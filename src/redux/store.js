import {configureStore} from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import people from './slices/peopleSlice'
export const store = configureStore({
	
	
	reducer:{
		user,
		people
	}
})