import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { borrowBook } from "../../interfaces/bookInterface";

type borrowedBookState = {
  loading: boolean;
  error: string | null;
  message: string | null;
  userBorrowedBooks: borrowBook[];
  allBorrowedBooks: borrowBook[];
};
const initialState: borrowedBookState = {
  loading: false,
  error: null,
  message: null,
  userBorrowedBooks: [],
  allBorrowedBooks: [],
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    fetchUserBorrowedBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchUserBorrowedBooksSuccess: (state, action) => {
      console.log(action);
      state.loading = false;
      state.userBorrowedBooks = action.payload.data;
    },
    fetchUserBorrowedBooksFailed: (state, action) => {
      console.log(action);
      state.loading = false;
      state.message = null;
      state.error = action.payload.errorResponse.message;
    },

    recordBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBookSuccess: (state, action) => {
      console.log(action);
      state.loading = false;
      state.message = action.payload.data;
    },
    recordBookFailed: (state, action) => {
      console.log(action);
      state.loading = false;
      state.message = null;
      state.error = action.payload.errorResponse.message;
    },

    fetchAllBorrowedBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllBorrowedBooksSuccess: (state, action) => {
      console.log(action);
      state.loading = false;
      state.allBorrowedBooks = action.payload.data;
    },
    fetchAllBorrowedBooksFailed: (state, action) => {
      console.log(action);
      state.loading = false;
      state.message = null;
      state.error = action.payload.errorResponse.message;
    },

    returnBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBookSuccess: (state, action) => {
      console.log(action);
      state.loading = false;
      state.message = action.payload.data;
    },
    returnBookFailed: (state, action) => {
      console.log(action);
      state.loading = false;
      state.message = null;
      state.error = action.payload.errorResponse.message;
    },

    resetBookSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const fetchUserBorrowedBooks =
  (email: string) => async (dispatch: Dispatch) => {
    dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest());

    await axios
      .get("/borrow/my-borrowed-books")
      .then((res) =>
        dispatch(borrowSlice.actions.fetchUserBorrowedBooksSuccess(res.data))
      )
      .catch((err) => {
        dispatch(
          borrowSlice.actions.fetchUserBorrowedBooksFailed(err.response?.data)
        );
      });
  };

export const fetchAllBorrowedBooks = () => async (dispatch: Dispatch) => {
  dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());

  await axios
    .get("/borrow/borrowed-books-by-user")
    .then((res) =>
      dispatch(borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data))
    )
    .catch((err) => {
      dispatch(
        borrowSlice.actions.fetchAllBorrowedBooksFailed(err.response?.data)
      );
    });
};

export const recordBorrowBook =
  (id: string, email: string) => async (dispatch: Dispatch) => {
    dispatch(borrowSlice.actions.recordBookRequest());

    await axios
      .post(`/borrow/record-borrow-book/${id}`, { email })
      .then((res) => dispatch(borrowSlice.actions.recordBookSuccess(res.data)))
      .catch((err) => {
        dispatch(borrowSlice.actions.recordBookFailed(err.response?.data));
      });
  };

export const returnBook =
  (bookId: string, email: string) => async (dispatch: Dispatch) => {
    dispatch(borrowSlice.actions.returnBookRequest());

    await axios
      .post(`/borrow/return-borrowed-book/${bookId}`, { email })
      .then((res) => dispatch(borrowSlice.actions.returnBookSuccess(res.data)))
      .catch((err) => {
        dispatch(borrowSlice.actions.returnBookFailed(err.response?.data));
      });
  };

export const resetBookSlice = () => (dispatch: Dispatch) => {
  dispatch(borrowSlice.actions.resetBookSlice());
};

export default borrowSlice.reducer;
