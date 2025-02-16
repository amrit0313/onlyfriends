import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authslice";
const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
});

export default store;
