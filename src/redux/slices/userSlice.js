import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokens: {
    access: localStorage.getItem("accessToken"),
    refresh: localStorage.getItem("refreshToken"),
  },
  isAuth: false,
  aboutUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUserAccessToken: (state, action) => {
      state.tokens.access = action.payload;
    },
    setUserRefreshToken: (state, action) => {
      state.tokens.refresh = action.payload;
    },
    setAboutUser: (state, action) => {
      state.aboutUser = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    logOut(state) {
      state.tokens = {};
    },
  },
});

export const {
  setUserTokens,
  setAboutUser,
  setUserRefreshToken,
  setUserAccessToken,
  setIsAuth,
  logOut,
} = userSlice.actions;

export default userSlice.reducer;
