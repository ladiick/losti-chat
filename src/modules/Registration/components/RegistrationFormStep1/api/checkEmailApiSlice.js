import { apiSlice } from "../../../../../components/api/apiSlice";

export const checkEmailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    existEmail: builder.mutation({
      query: (email) => `/auth/users/check_mail/?email=${email}`,
    }),
  }),
});

export const { useExistEmailMutation } = checkEmailApiSlice;
