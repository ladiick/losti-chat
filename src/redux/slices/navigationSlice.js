import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	modal: {
		writeFriend: false,
		viewForwardMessage: false,
		viewAttachmentsInDialogs: false
	},

	//modal

	openDetailedImage: false,

	forwardMessageFlag: false,
	answerMessageFlag: false,
	deleteFriend: false,
	deleteFriendObj: {},
	//
	chat: false,
	searchFriend: false,

	// from which URL the image was opened

	openFromDialog: true,


	// drag over state

	dragOver: false

}


export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,

	reducers: {
		openModalBlock(state, action) {
			state.modal.writeFriend = action.payload.writeFriend
			state.modal.viewForwardMessage = action.payload.viewForwardMessage
			state.modal.viewAttachmentsInDialogs = action.payload.viewAttachmentsInDialogs
		},
		openChatBlock(state, action) {
			state.chat = action.payload
		},
		searchFriend(state, action) {
			state.searchFriend = action.payload
		},
		deleteFriend(state, action) {
			state.deleteFriend = action.payload.flag
			state.deleteFriendObj = action.payload.obj
		},
		forwardMessageFlag(state, action) {
			state.forwardMessageFlag = action.payload
		},
		answerMessageFlag(state, action) {
			state.answerMessageFlag = action.payload
		},
		setOpenDetailedImage(state, action) {
			state.openDetailedImage = action.payload
		},
		setOpenFromDialog(state, action) {
			state.openFromDialog = action.payload
		},
		setDragOver(state, action) {
			state.dragOver = action.payload
		}
	},


})

export const {
	openModalBlock, openChatBlock, searchFriend, deleteFriend,
	forwardMessageFlag, setOpenDetailedImage, setOpenFromDialog, setDragOver
} = navigationSlice.actions

export default navigationSlice.reducer