import { createSlice } from "@reduxjs/toolkit";

export const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: {
    accessToken: null,
  },
  reducers: {
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { clearAccessToken, saveAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
