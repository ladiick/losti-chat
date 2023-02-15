import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	nav: false,
	modal: false,
	chat: true
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
		},
		openChatBlock(state,action){
			 state.chat = action.payload
		}
	}
	
	
})

export const {openNavBar,openModalBlock,openChatBlock} = navigationSlice.actions

export default navigationSlice.reducer