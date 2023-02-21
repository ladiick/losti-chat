import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	stepsInfo:
		{
			email: '',
			password: '',
		},
}


export const registrationStepsSlice = createSlice({
	name: 'registrationSteps',
	initialState,
	
	reducers: {
		setRegistrationSteps(state, action) {
			state.stepsInfo = {...state.stepsInfo, ...action.payload}
		}
		
	}
	
	
})

export const {setRegistrationSteps} = registrationStepsSlice.actions

export default registrationStepsSlice.reducer