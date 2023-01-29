import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPeople = createAsyncThunk(
	'people/fetchPeople',
	async (userAccessToken) => {
		
		// const {userAccessToken} = params
		const res = await axios.get('http://127.0.0.1:8000/api/v1/dialogs/', {
			headers: {Authorization: `JWT ${userAccessToken}`}
		})
		
		return res.data
	}
)

const initialState = {
	people: [],
	peopleChecked: null,
	peopleCurrent: {},
	updatePeople: {},
	index: null,
	status: 'loading',
}


export const peopleSlice = createSlice({
	name: 'people',
	initialState,
	
	reducers: {
		
		setPeopleChecked: (state, action) => {
			state.peopleChecked = action.payload
		},
		setCurrentPeople:(state,action)=>{
			state.peopleCurrent = action.payload
		},
		updatePeople: (state, action)=>{
			state.people.splice(action.payload.index,1)
			state.people.unshift(action.payload.obj)
		},
		setIndex:(state,action)=>{
			state.index = action.payload
		}
		
		
	},
	
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

export const {setPeopleChecked,setCurrentPeople,updatePeople,setIndex} = peopleSlice.actions

export default peopleSlice.reducer