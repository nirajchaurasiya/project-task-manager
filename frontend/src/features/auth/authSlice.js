import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: null, // Initially, no user is logged in
  },
  reducers: {
    saveLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    clearLoggedInUser: (state) => {
      state.loggedInUser = null;
    },
    addAssigneeToRedux: (state, action) => {
      state.loggedInUser?.chosenAssignees?.push(action.payload);
    },
  },
});

export const { saveLoggedInUser, clearLoggedInUser, addAssigneeToRedux } =
  authSlice.actions;

export default authSlice.reducer;
