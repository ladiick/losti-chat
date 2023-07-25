import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import people from "./slices/peopleSlice";
import message from "./slices/messageSlice";
import navigation from "./slices/navigationSlice";
import friends from "../modules/Friends/slices/friendsSlice";
import registration from "../modules/Registration/store/registrationStepsSlice";
import { apiSlice } from "../components/api/apiSlice";
import theme from "../redux/slices/themeSlice";
import dragAndDrop from './slices/dragAndDropSlice'
// import {dialogsAPI} from "../components/api/apiSlice";

export const store = configureStore({
  reducer: {
    user,
    people,
    message,
    navigation,
    friends,
    registration,
    theme,
    dragAndDrop,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // message.sendMessageOnCha
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["message/sendMessagesOnChat"],
        ignoredPaths: ["message.sendMessageOnChat"],
      },
    }).concat(apiSlice.middleware),
});
