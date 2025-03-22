import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.ts";
import popUpReducer from "./slices/popUpSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popUpReducer,
  },
});
