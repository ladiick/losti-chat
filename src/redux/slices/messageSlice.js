import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {reDate} from "../../components/actions/reDate";

export const fetchMessage = createAsyncThunk(
	'message/fetchMessage',
	async (params)=>{
		const {userAccessToken,id} = params
		const res = await axios.get(`http://127.0.0.1:8000/api/v1/dialog/${id}/`, {
			headers: {Authorization: `JWT ${userAccessToken}`}
		})
		return reDate(res.data)
	}
)

const initialState = {
	message: [],
	status: 'loading',
}


export const messageSlice = createSlice({
	name: 'message',
	initialState,
	
	reducers: {
		setMessage: (state,action)=>{
			state.message.unshift(action.payload)
		}
	},
	
	extraReducers: {
		[fetchMessage.pending]: (state) => {
			state.status = 'loading'
			state.message = []
		},
		[fetchMessage.fulfilled]: (state, action) => {
			state.status = 'success'
			state.message = action.payload
		},
		[fetchMessage.rejected]: (state) => {
			state.status = 'error'
			state.message = []
		}
		
	}
	
	
})

export const {setMessage} = messageSlice.actions

export default messageSlice.reducer