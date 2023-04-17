import {apiSlice} from "../api/apiSlice";

export const aboutFriendsUserApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAboutFriendsUser: builder.query({
			query: (id) => `/friends/${id}/user/`,
		})
	})
})

export const {
	useGetAboutFriendsUserQuery
} = aboutFriendsUserApiSlice