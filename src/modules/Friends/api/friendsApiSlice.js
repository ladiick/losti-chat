import { apiSlice } from "../../../components/api/apiSlice";

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: () => "/friends/",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "addFriendsRequests", id })), { type: "addFriendsRequests", id: "LIST" }]
          : [{ type: "addFriendsRequests", id: "LIST" }],
    }),
    acceptFriendRequests: builder.mutation({
      query: (body) => ({
        url: "/friends/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "addFriendsRequests", id: "LIST" }],
    }),
    cancelFriendRequests: builder.mutation({
      query: (pk) => ({
        url: `/friends/${pk}/denied/`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "addFriendsRequests", id: "LIST" }],
    }),
    updateFriends: builder.mutation({
      query: () => "/friends/",
      invalidatesTags: [{ type: "addFriendsRequests", id: "LIST" }],
    }),
    deleteFriends: builder.mutation({
      query: (pk) => ({
        url: `/friends/${pk}/`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "addFriendsRequests", id: "LIST" }],
    }),
  }),
});

export const { useGetFriendsQuery, useAcceptFriendRequestsMutation, useCancelFriendRequestsMutation, useUpdateFriendsMutation, useDeleteFriendsMutation } =
  friendsApiSlice;
