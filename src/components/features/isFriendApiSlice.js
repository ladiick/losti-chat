import {apiSlice} from "../api/apiSlice";

export const isFriendApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getIsFriend: builder.query({
			query: (id) => `/friends/${id}/is_friend/`,
		})
	})
})

export const {
	useGetIsFriendQuery
} = isFriendApiSlice