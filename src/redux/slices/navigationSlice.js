import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	nav: false,
}


export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	
	reducers: {
		openNavBar(state,action){
			state.nav = action.payload
		}
	}
	
	
})

export const {openNavBar} = navigationSlice.actions

export default navigationSlice.reducer