import {createSlice} from "@reduxjs/toolkit";

import _ from "underscore";



const initialState = {
	people: [],
	index: null,
}


export const peopleSlice = createSlice({
	name: 'people',
	initialState,
	
	reducers: {

		addPeople(state,action){
			state.people = action.payload
		},
		setAddFriend(state,action){
			state.peopleAll.splice(action.payload,1)
		},
		
		setNullPeople(state,action){
			state.people = action.payload
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

	
	
})

export const {setCurrentPeople, updatePeople, setIndex,setAddFriend,addPeople} = peopleSlice.actions

export default peopleSlice.reducer