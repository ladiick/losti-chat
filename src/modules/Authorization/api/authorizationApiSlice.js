import { apiSlice } from "../../../components/api/apiSlice";

export const authorizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authorization: builder.mutation({
      query: (data) => ({
        url: "/token/",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useAuthorizationMutation } = authorizationApiSlice;
