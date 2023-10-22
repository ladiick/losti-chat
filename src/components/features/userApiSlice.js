import { setAboutUser, setIsAuth } from "../../redux/slices/userSlice";
import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/auth/users/me/",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAboutUser(data));
          dispatch(setIsAuth(true));
        } catch (err) {
          console.log("ошибка, разрабы не дауны");
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
