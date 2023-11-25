import { apiSlice } from "../../../components/api/apiSlice";
import { processMessages } from "../helpers/helpersMessage";

const transformMessages = (data) => {
  return {
    ...data,
    results: processMessages(data.results.reverse()),
  };
};

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: ({ id, page }) => `/dialog/${id}/?page=${page}&page_size=40`,
      transformResponse: transformMessages,
    }),
  }),
});

export const { useGetMessageQuery } = messageApiSlice;
