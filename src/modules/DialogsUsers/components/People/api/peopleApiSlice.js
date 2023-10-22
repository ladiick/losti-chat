import { apiSlice } from "../../../../../components/api/apiSlice";
import { addPeople } from "../../../../../redux/slices/peopleSlice";

export const peopleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: () => "/dialogs/",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addPeople(data));
        } catch (err) {
          console.log("ошибка, разрабы не дауны");
        }
      },
    }),
  }),
});

export const { useGetPeopleQuery } = peopleApiSlice;
