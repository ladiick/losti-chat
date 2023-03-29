
import { apiSlice } from "../api/apiSlice"

export const currentPeopleApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCurrentPerson: builder.query({
            query: (id) => `/findPeople/${id}/`
        })
    })
})

export const {
    useGetCurrentPersonQuery,
} = currentPeopleApiSlice
