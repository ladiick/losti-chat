import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	friends: false,
	settings: false,
	notification: false
};

export const pages = createSlice({
  name: "pages",
  initialState,

	reducers: {
		showFriendsPage(state) {
			state.friends = !state.friends;
		},
		showSettingsPage(state) {
			state.settings = !state.settings;
		},
		showNotificationPage(state) {
			state.notification = !state.notification;
		}
	}
});

export const { showFriendsPage, showSettingsPage, showNotificationPage } = pages.actions;

export default pages.reducer;
