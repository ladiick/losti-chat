import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	message: {},
	currentMessage: {},
	preValueSearch: ''
}


export const messageSlice = createSlice({
	name: 'message',
	initialState,

	reducers: {
		addMessage(state, action) {

			state.message.next = action.payload.next

			let indexOldMessage = action.payload.results.findIndex(obj => {
				if (state.message.results[state.message.results.length - 1].id === obj.id) {
					return true
				} else {
					return false
				}

			})


			if (indexOldMessage !== -1) {
				state.message.results = [...state.message.results, ...action.payload.results.slice(indexOldMessage + 1, action.payload.length)]
			} else {
				state.message.results = [...state.message.results, ...action.payload.results]
			}
		},

		newMessages(state, action) {
			state.message = action.payload
		},

		setMessage: (state, action) => {
			state?.message?.results?.unshift(action?.payload)
		},
		currentMessage(state, action) {

			if (action.payload.param in state.currentMessage) {

				const indexMessage = state.currentMessage[action.payload.param].findIndex((message, index) => {
					if (message.id === action.payload.obj.id) {
						return true
					}
				})

				if (indexMessage === -1) {
					state.currentMessage[action.payload.param].push(action.payload.obj)
					state.currentMessage[action.payload.param].sort((a, b) => a.id - b.id)
				} else {
					state.currentMessage[action.payload.param].splice(indexMessage, 1)
				}

			} else {
				state.currentMessage = {
					...state.currentMessage,
					[action.payload.param]: []
				}
				state.currentMessage[action.payload.param].push(action.payload.obj)

			}

		},

		clearMessage(state,action) {
			state.currentMessage[action.payload.param] = []
		},
		setPreValueSearch(state,action){
			state.preValueSearch = action.payload
		}

	},


})

export const {
	setMessage,
	addMessage,
	newMessages,
	currentMessage,
	clearMessage,
	setPreValueSearch
} = messageSlice.actions

export default messageSlice.reducer