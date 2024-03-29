import { apiSlice } from "../../../components/api/apiSlice";

export const friendsPossibleFriendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPossibleFriends: builder.query({
      query: () => "/friends/possible_friends/",
    }),
  }),
});

export const { useGetPossibleFriendsQuery } = friendsPossibleFriendsApiSlice;
