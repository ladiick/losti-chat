import { apiSlice } from "../../../components/api/apiSlice";

export const findPeopleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPeople: builder.query({
      query: () => "/findPeople/",
    }),
  }),
});

export const { useGetAllPeopleQuery } = findPeopleApiSlice;
