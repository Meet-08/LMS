import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popUpReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";
import bookSlice from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popUpReducer,
    user: userReducer,
    [bookSlice.reducerPath]: bookSlice.reducer,
    borrow: borrowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookSlice.middleware),
});
