import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setUserAccessToken } from "../../redux/slices/userSlice";
import { HOST } from "./HOST";

const baseQuery = fetchBaseQuery({
  baseUrl: `${HOST}/api/v1`,

  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.tokens.access;
    if (token) {
      headers.set("authorization", `JWT ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (api.endpoint === "authorization" || api.endpoint === "registration") {
    return result;
  }

  if (result?.error && result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      {
        url: "/token/refresh/",
        method: "POST",
        body: {
          refresh: api.getState().user.tokens.refresh,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult?.data) {
      localStorage.setItem("accessToken", refreshResult.data.access);
      api.dispatch(setUserAccessToken(refreshResult.data.access));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      window.location.href = "/logout";
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ["addFriendsRequests"],
  endpoints: (builder) => ({}),
});

// export const {useGetDialogsQuery} = dialogsAPI
