import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	tokens: {
		access: '',
		refresh: '',
	},
	aboutUser: {}
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	
	reducers: {
		
		setUserAccessToken: (state,action)=>{
			state.tokens.access = action.payload
		},
		setUserRefreshToken: (state,action)=>{
			state.tokens.refresh = action.payload
		},
		
		setAboutUser: (state,action)=>{
			state.aboutUser = action.payload
		}
		
}

	
})

export const { setUserTokens,setAboutUser, setUserRefreshToken,setUserAccessToken } = userSlice.actions

export default userSlice.reducer