import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  id: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.id = action.payload.id;
    },
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.id = null;
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
