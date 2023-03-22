import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	
	modal: false,
	chat: false,
	searchFriend: false
}


export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	
	reducers: {
		openModalBlock(state,action){
			state.modal = action.payload
		},
		openChatBlock(state,action){
			 state.chat = action.payload
		},
		searchFriend(state,action){
			 state.searchFriend = action.payload
		},
		
	}
	
	
})

export const {openNavBar,openModalBlock,openChatBlock,searchFriend} = navigationSlice.actions

export default navigationSlice.reducer