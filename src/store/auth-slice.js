import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: "", isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
