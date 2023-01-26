import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPeople = createAsyncThunk(
	'people/fetchPeople',
	async (userAccessToken)=>{
		// const {userAccessToken} = params
		const res = await axios.get('http://127.0.0.1:8000/api/v1/dialogs/', {
			headers: {Authorization: `JWT ${userAccessToken}`}
		})
			return res.data
	}
)

const initialState = {
	people: [],
	status: 'loading',
}


export const peopleSlice = createSlice({
	name: 'people',
	initialState,
	
	reducers: {},
	
	extraReducers: {
		[fetchPeople.pending]: (state) => {
			state.status = 'loading'
			state.people = []
		},
		[fetchPeople.fulfilled]: (state, action) => {
			state.status = 'success'
			state.people = action.payload
		},
		[fetchPeople.rejected]: (state) => {
			state.status = 'error'
			state.people = []
		}
		
	}
	
	
})

export const {} = peopleSlice.actions

export default peopleSlice.reducer