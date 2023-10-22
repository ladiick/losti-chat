import { apiSlice } from "../../../../../components/api/apiSlice";

export const checkAuthCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkAuthCode: builder.mutation({
      query: (code) => ({
        url: `/auth/users/check_code/?code=${code}&email=${localStorage.getItem("email")}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCheckAuthCodeMutation } = checkAuthCodeApiSlice;
