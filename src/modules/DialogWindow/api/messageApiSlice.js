import { apiSlice } from "../../../components/api/apiSlice";
import { addTimeMessage } from "../helpers/helpersMessage";

const transformMessages = (data) => {
  return {
    ...data,
    results: addTimeMessage(data.results),
  };
};

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: ({ id, page }) => `/dialog/${id}/?page=${page}&page_size=60`,
      transformResponse: transformMessages,
    }),
  }),
});

export const { useGetMessageQuery } = messageApiSlice;
