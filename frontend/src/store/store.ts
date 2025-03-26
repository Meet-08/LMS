import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popUpReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";
import bookSlice from "./slices/bookSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popUpReducer,
    user: userReducer,
    [bookSlice.reducerPath]: bookSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookSlice.middleware),
});
