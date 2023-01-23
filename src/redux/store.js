import {configureStore} from "@reduxjs/toolkit";
import user from "./slices/userSlice";

export const store = configureStore({
	
	
	reducer:{
		user
	}
})