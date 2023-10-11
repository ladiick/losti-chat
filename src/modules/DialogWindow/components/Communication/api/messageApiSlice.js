import { apiSlice } from "../../../../../components/api/apiSlice";
import { addMessage } from "../../../../../redux/slices/messageSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: ({ id, page }) => `/dialog/${id}/?page=${page}&page_size=20`,
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

export const { useGetMessageQuery } = messageApiSlice;
