import { configureStore } from "@reduxjs/toolkit";
import loggedInUserReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
  },
});
