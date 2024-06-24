import { configureStore } from "@reduxjs/toolkit";
import loggedInUserReducer from "../features/auth/authSlice";
import accessTokenReducer from "../features/accessToken/accessTokenSlice";
export const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    accessToken: accessTokenReducer,
  },
});
