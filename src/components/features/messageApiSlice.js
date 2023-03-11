import {apiSlice} from "../api/apiSlice";
import {addMessage} from "../../redux/slices/messageSlice";
import {logOut} from "../../redux/slices/userSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessage: builder.query({
            query: (id) => `/dialog/${id}/?page=1&page_size=20`,
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                try{
                    const {data} = await queryFulfilled
                    let data2 = [...data.results]
                    dispatch(addMessage(data2))
                }
                catch (err){
                    console.log('ошибка, разрабы не дауны',err)
                }
            },

        }),
        pagination: builder.mutation({
            query: ({id, page})=> `/dialog/${id}/?page=${page}&page_size=20`,
            async onQueryStarted(id,{dispatch,queryFulfilled}){
                try{
                    const {data} = await queryFulfilled
                    let data2 = [...data.results]
                    dispatch(addMessage(data2))
                }
                catch (err){
                    console.log('ошибка, разрабы не дауны',err)
                }
            },
        })



    })
})

export const {
    useGetMessageQuery,
    usePaginationMutation
} = messageApiSlice
