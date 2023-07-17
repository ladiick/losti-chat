import { apiSlice } from "../../../../../components/api/apiSlice";

export const registrationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (formData) => ({
        url: "/auth/users/",
        method: "POST",
        formData: true,
        body: formData,
      }),
    }),
  }),
});

export const { useRegistrationMutation } = registrationApiSlice;
