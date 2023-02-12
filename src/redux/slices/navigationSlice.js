import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	nav: false,
	modal: false,
}


export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	
	reducers: {
		openNavBar(state,action){
			state.nav = action.payload
		},
		openModalBlock(state,action){
			state.modal = action.payload
		}
	}
	
	
})

export const {openNavBar,openModalBlock} = navigationSlice.actions

export default navigationSlice.reducer