import { apiSlice } from "../../../../components/api/apiSlice";

export const attachmentsImagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttachmentsImages: builder.query({
      query: (id) => `/dialog/attachments/images/${id}/`,
    }),
  }),
});

export const { useGetAttachmentsImagesQuery } = attachmentsImagesApiSlice;
