import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: null,
  settings: false,
  notification: false,
};

export const pages = createSlice({
  name: "pages",
  initialState,

  reducers: {
    showFriendsPage(state, action) {
      state.friends = action.payload;
    },
    showSettingsPage(state) {
      state.settings = !state.settings;
    },
    showNotificationPage(state) {
      state.notification = !state.notification;
    },
  },
});

export const { showFriendsPage, showSettingsPage, showNotificationPage } = pages.actions;

export default pages.reducer;

export const pageSelector = (state) => state.pages;
