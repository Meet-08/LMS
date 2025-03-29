import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popUpReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";
import bookSlice from "./slices/bookSlice";
// import borrowReducer from "./slices/borrowSlice"; // Removed old slice
import { borrowApi } from "./api/borrowApi"; // Import the new API slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popUpReducer,
    user: userReducer,
    [bookSlice.reducerPath]: bookSlice.reducer,
    // borrow: borrowReducer, // Removed old reducer
    [borrowApi.reducerPath]: borrowApi.reducer, // Add new API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookSlice.middleware, borrowApi.middleware), // Add new API middleware
});
