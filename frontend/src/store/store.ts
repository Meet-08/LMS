import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popUpReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";
import bookSlice from "./api/bookApi";
import { borrowApi } from "./api/borrowApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popUpReducer,
    user: userReducer,
    [bookSlice.reducerPath]: bookSlice.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookSlice.middleware, borrowApi.middleware), // Add new API middleware
});
