import { apiSlice } from "../../../../../components/api/apiSlice";

export const sendCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendCode: builder.mutation({
      query: (email) => ({
        method: "POST",
        url: "/auth/code/",
        body: { email },
      }),
    }),
  }),
});

export const { useSendCodeMutation } = sendCodeApiSlice;
