import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state) {
      state.loading = false;
      state.isLoggedIn = true;
    },
    loginFailure(state) {
      state.loading = false;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});
export const authActions = AuthSlice.actions;
export default AuthSlice;
