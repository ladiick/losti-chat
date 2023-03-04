import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {reDate} from "../../components/actions/reDate";
import {HOST} from "../../components/api/HOST";
import {updateAccessToken} from "../../components/actions/updateAccessToken";
import {setUserAccessToken} from "./userSlice";

export const fetchMessage = createAsyncThunk(
	'message/fetchMessage',
	async ({userAccessToken, userRefreshToken, dialogsId},{dispatch})=>{
		try {
			const res = await axios.get(`http://${HOST}/api/v1/dialog/${dialogsId}/`, {
				headers: {Authorization: `JWT ${userAccessToken}`}
			})
			return reDate(res.data)
		}
		catch (err) {
			if (err.response.status === 401) {
				console.log(err)
				const token = await updateAccessToken(userRefreshToken)
				dispatch(setUserAccessToken(token))
			}
		}
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