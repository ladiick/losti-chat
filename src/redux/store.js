import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../components/api/apiSlice";
import friends from "../modules/Friends/slices/friendsSlice";
import registration from "../modules/Registration/store/registrationStepsSlice";
import theme from "../redux/slices/themeSlice";
import modals from "./slices/modalsSlice";
import dragAndDrop from "./slices/dragAndDropSlice";
import message from "./slices/messageSlice";
import navigation from "./slices/navigationSlice";
import pages from "./slices/pages";
import people from "./slices/peopleSlice";
import user from "./slices/userSlice";

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
    pages,
    modals,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["message/dialogs"],
        ignoredPaths: ["message/dialogs"],
      },
    }).concat(apiSlice.middleware),
});
