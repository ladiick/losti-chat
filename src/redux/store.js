import {configureStore} from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import people from './slices/peopleSlice'
import message from "./slices/messageSlice";
import navigation from "./slices/navigationSlice";
import friends from "./slices/friendsSlice";
import registration from "./slices/registrationStepsSlice";
import {apiSlice} from "../components/api/apiSlice";

// import {dialogsAPI} from "../components/api/apiSlice";

export const store = configureStore({


    reducer: {
        user,
        people,
        message,
        navigation,
        friends,
        registration,
        [apiSlice.reducerPath]: apiSlice.reducer,

    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
})