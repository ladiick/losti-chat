import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	modal: {
		writeFriend:false,
		viewForwardMessage: false,
		viewAttachmentsInDialogs: false
	},

	chat: false,
	searchFriend: false,
	deleteFriend: false,
	deleteFriendObj: {},
	forwardMessageFlag: false,
	answerMessageFlag: false,

}


export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	
	reducers: {
		openModalBlock(state,action){
			state.modal.writeFriend = action.payload.writeFriend
			state.modal.viewForwardMessage = action.payload.viewForwardMessage
			state.modal.viewAttachmentsInDialogs = action.payload.viewAttachmentsInDialogs
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
		answerMessageFlag(state,action){
			state.answerMessageFlag = action.payload
		}
	}
	
	
})

export const {openModalBlock,openChatBlock,searchFriend,deleteFriend,
	forwardMessageFlag,answerMessageFlag} = navigationSlice.actions

export default navigationSlice.reducer