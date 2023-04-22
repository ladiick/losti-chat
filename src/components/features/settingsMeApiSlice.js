import {apiSlice} from "../api/apiSlice";

export const settingsMeApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		setSettings: builder.mutation({
			query: (param) => (
				{
					url: `/auth/users/settings/me/`,
					method: 'PATCH',
					body: {
						theme: param
					}
				}),
		})
	})
})

export const {
	useSetSettingsMutation
} = settingsMeApiSlice