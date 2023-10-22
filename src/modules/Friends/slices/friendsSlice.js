import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendsCurrent: {},
  requestCurrentFriend: {},
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,

  reducers: {
    setFriendsCurrent(state, action) {
      state.friendsCurrent = action.payload;
    },
  },
});

export const { setFriendsCurrent } = friendsSlice.actions;

export default friendsSlice.reducer;
