import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: false,
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
    closePages(state) {
      state.friends = false;
      state.settings = false;
      state.notification = false;
    },
  },
});

export const { showFriendsPage, showSettingsPage, showNotificationPage, closePages } =
  pages.actions;

export default pages.reducer;

export const pageSelector = (state) => state.pages;
