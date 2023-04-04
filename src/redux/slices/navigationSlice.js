import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	modal: false,
	chat: false,
	searchFriend: false,
	deleteFriend: false,
	deleteFriendObj: {},
	forwardMessageFlag: false,
	forwardMessageSendFlag: false
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
		deleteFriend(state,action){
			state.deleteFriend = action.payload.flag
			state.deleteFriendObj = action.payload.obj
		},
		forwardMessageFlag(state,action){
			state.forwardMessageFlag = action.payload
		},
		forwardMessageSendFlag(state,action){
			state.forwardMessageSendFlag = action.payload
		},

	}
	
	
})

export const {openModalBlock,openChatBlock,searchFriend,deleteFriend,
	forwardMessageFlag,forwardMessageSendFlag} = navigationSlice.actions

export default navigationSlice.reducer