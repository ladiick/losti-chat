import { apiSlice } from "../../../../../components/api/apiSlice";
import { addMessage, newMessages } from "../../../../../redux/slices/messageSlice";
import { logOut } from "../../../../../redux/slices/userSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: (id) => `/dialog/${id}/?page=1&page_size=20`,
      keepUnusedDataFor: -1,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(newMessages(data));
        } catch (err) {
          console.log("ошибка, разрабы не дауны", err);
        }
      },
    }),
    pagination: builder.mutation({
      query: ({ id, page }) => `/dialog/${id}/?page=${page}&page_size=20`,
      keepUnusedDataFor: -1,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addMessage(data));
        } catch (err) {
          console.log("ошибка, разрабы не дауны", err);
        }
      },
    }),
  }),
});

export const { useGetMessageQuery, usePaginationMutation } = messageApiSlice;
