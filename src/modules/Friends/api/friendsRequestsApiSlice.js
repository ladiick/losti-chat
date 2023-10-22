import { apiSlice } from "../../../components/api/apiSlice";

export const friendsRequestsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsRequests: builder.query({
      query: () => "/friends/requests/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "addFriendsRequests", id })),
              { type: "addFriendsRequests", id: "LIST" },
            ]
          : [{ type: "addFriendsRequests", id: "LIST" }],
    }),
    updateFriendRequests: builder.mutation({
      query: () => "/friends/requests/",
      invalidatesTags: [{ type: "addFriendsRequests", id: "LIST" }],
    }),
  }),
});

export const { useGetFriendsRequestsQuery, useUpdateFriendRequestsMutation } =
  friendsRequestsApiSlice;
