import { apiSlice } from "../api/apiSlice";

export const getImageInMessageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImageInMessage: builder.query({
      query: (id) => ({
        url: `/media/chat/image/${id}/`,
        responseHandler: async (response) => URL.createObjectURL(await response.blob()),
      }),
    }),
  }),
});

export const { useGetImageInMessageQuery } = getImageInMessageApiSlice;
