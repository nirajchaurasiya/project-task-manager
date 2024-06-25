import { configureStore } from "@reduxjs/toolkit";
import loggedInUserReducer from "../features/auth/authSlice";
import accessTokenReducer from "../features/accessToken/accessTokenSlice";
import formattedTasksReducer from "../features/tasks/formattedTasksSlice";
export const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    accessToken: accessTokenReducer,
    formattedTasks: formattedTasksReducer,
  },
});
