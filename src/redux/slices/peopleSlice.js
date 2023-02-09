import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import _ from "underscore";
import {HOST} from "../../components/api/HOST";
import {updateAccessToken} from "../../components/actions/updateAccessToken";
import {setUserAccessToken} from "./userSlice";

export const fetchPeople = createAsyncThunk(
	'people/fetchPeople',
	async ({userAccessToken,userRefreshToken},{dispatch}) => {
		try {
			const res = await axios.get(`${HOST}/api/v1/dialogs/`, {
				headers: {Authorization: `JWT ${userAccessToken}`}
			})
			return res.data
			
		}
		catch (err) {
			if (err.response.status === 401) {
				const token = await updateAccessToken(userRefreshToken)
				dispatch(setUserAccessToken(token))
			}
		}
		
	}
)

const initialState = {
	people: [],
	peopleCurrent: {},
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
		setCurrentPeople: (state, action) => {
			state.peopleCurrent = action.payload
		},
		setIndex: (state, action) => {
			state.index = action.payload
		},
		updatePeople(state, action) {
			// state.people[action.payload.index] = action.payload.data
			let arr1 = [action.payload.data.sender.pk, action.payload.data.recip.pk].sort()
			let peopleIndex = state.people.findIndex(obj => {
				let arr2 = [obj.sender.pk, obj.recip.pk].sort()
				return _.isEqual(arr1, arr2)
				//_.isEqual(arr1,arr2)
			})
			
			if (peopleIndex === -1) {
				state.index += 1
				state.people.unshift(action.payload.data)
			} else {
				state.people.splice(peopleIndex, 1)
				state.people.unshift(action.payload.data)
				if (peopleIndex > state.index) {
					state.index += 1
				}
				
			}
			if (action.payload.data.sender === action.payload.myId) {
				state.index = 0
			}
			
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

export const {setPeopleChecked, setCurrentPeople, updatePeople, setIndex} = peopleSlice.actions

export default peopleSlice.reducer