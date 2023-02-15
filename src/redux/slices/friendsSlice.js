import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {HOST} from "../../components/api/HOST";
import {updateAccessToken} from "../../components/actions/updateAccessToken";
import {setUserAccessToken} from "./userSlice";


export const fetchFriends = createAsyncThunk(
	'friends/fetchFriends',
	async ({userAccessToken,userRefreshToken},{dispatch})=>{
		
		try {
			const res = await axios.get(`http://${HOST}/api/v1/friends/`, {
				headers: {Authorization: `JWT ${userAccessToken}`}
			})
			console.log(res)
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
export const fetchFriendsRequests = createAsyncThunk(
	'friendsRequests/fetchFriendsRequests',
	async ({userAccessToken,userRefreshToken},{dispatch})=>{
		try {
			const res = await axios.get(`http://${HOST}/api/v1/friends/requests/`, {
				headers: {Authorization: `JWT ${userAccessToken}`}
			})
			console.log(res)
			
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
	friends : [],
	friendsRequests: [],
	requestCurrentFriend: {},
	status: ''
}


export const friendsSlice = createSlice({
	name: 'friends',
	initialState,
	
	reducers: {
		
		setRequestFriend(state,action){
			state.requestCurrentFriend = action.payload
		}
	
	},
	
	
	extraReducers: {
		[fetchFriends.pending]: (state) => {
			state.status = 'loading'
			state.friends = []
		},
		[fetchFriends.fulfilled]: (state, action) => {
			state.status = 'success'
			state.friends = action.payload
		},
		[fetchFriends.rejected]: (state) => {
			state.status = 'error'
			state.friends = []
		},
		
		
		[fetchFriendsRequests.pending]: (state) => {
			state.status = 'loading'
			state.friendsRequests = []
		},
		[fetchFriendsRequests.fulfilled]: (state, action) => {
			state.status = 'success'
			state.friendsRequests = action.payload
		},
		[fetchFriendsRequests.rejected]: (state) => {
			state.status = 'error'
			state.friendsRequests = []
		}
		
		
		
	}
	
	
})

export const {setRequestFriend} = friendsSlice.actions

export default friendsSlice.reducer