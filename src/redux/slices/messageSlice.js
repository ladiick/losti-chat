import {createSlice} from "@reduxjs/toolkit";
import {addTimeMessage} from "../../components/actions/addTimeMessage";


const initialState = {
	message: [],
}


export const messageSlice = createSlice({
	name: 'message',
	initialState,
	
	reducers: {
		addMessage(state,action){
			state.message = [...state.message, ...addTimeMessage(action.payload)]
		},

		setMessage: (state,action)=>{
			if(new Date(state.message[0]?.time).getDate() !== new Date(action.payload?.time).getDate()){
				state.message.unshift({
					message: new Date(),
					type: 'Date',
					time: new Date()
				})
				state.message.unshift(action.payload)
			}
			else{
				state.message.unshift(action.payload)
			}


		}
	},

	
})

export const {setMessage,addMessage} = messageSlice.actions

export default messageSlice.reducer