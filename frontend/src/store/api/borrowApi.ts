import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { borrowBook } from "../../interfaces/bookInterface";
import { ApiResponse } from "../../interfaces/ApiResponse";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/borrow`,
    credentials: "include",
  }),
  tagTypes: ["UserBorrowedBooks", "AllBorrowedBooks", "Book"],
  endpoints: (builder) => ({
    getUserBorrowedBooks: builder.query<borrowBook[], void>({
      query: () => "/my-borrowed-books",
      providesTags: ["UserBorrowedBooks"],
      transformResponse: (response: ApiResponse<borrowBook[]>) => {
        return response.data || [];
      },
    }),
    getAllBorrowedBooks: builder.query<borrowBook[], void>({
      query: () => "/borrowed-books-by-user",
      providesTags: ["AllBorrowedBooks"],
      transformResponse: (response: ApiResponse<borrowBook[]>) => {
        return response.data || [];
      },
    }),
    recordBorrowBook: builder.mutation<
      ApiResponse<string>,
      { bookId: string; email: string }
    >({
      query: ({ bookId, email }) => ({
        url: `/record-borrow-book/${bookId}`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["UserBorrowedBooks", "AllBorrowedBooks", "Book"],
    }),
    returnBook: builder.mutation<
      ApiResponse<string>,
      { bookId: string; email: string }
    >({
      query: ({ bookId, email }) => ({
        url: `/return-borrowed-book/${bookId}`,
        method: "PUT",
        body: { email },
      }),
      invalidatesTags: ["UserBorrowedBooks", "AllBorrowedBooks"], // Invalidate tags on mutation
    }),
  }),
});

export const {
  useGetUserBorrowedBooksQuery,
  useGetAllBorrowedBooksQuery,
  useRecordBorrowBookMutation,
  useReturnBookMutation,
} = borrowApi;
