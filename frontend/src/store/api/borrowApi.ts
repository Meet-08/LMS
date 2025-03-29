import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { borrowBook } from "../../interfaces/bookInterface";
import { ApiResponse } from "../../interfaces/ApiResponse"; // Assuming a generic ApiResponse type exists

// Define a service using a base URL and expected endpoints
export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/borrow`,
    credentials: "include",
  }), // Adjust baseUrl if your API is hosted elsewhere
  tagTypes: ["UserBorrowedBooks", "AllBorrowedBooks", "Book"], // Define tags for caching invalidation
  endpoints: (builder) => ({
    getUserBorrowedBooks: builder.query<borrowBook[], void>({
      query: () => "/my-borrowed-books",
      providesTags: ["UserBorrowedBooks"], // Tag this query
      transformResponse: (response: ApiResponse<borrowBook[]>) => {
        return response.data || [];
      },
    }),
    getAllBorrowedBooks: builder.query<borrowBook[], void>({
      query: () => "/borrowed-books-by-user",
      providesTags: ["AllBorrowedBooks"], // Tag this query
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
      invalidatesTags: ["UserBorrowedBooks", "AllBorrowedBooks", "Book"], // Invalidate tags on mutation
    }),
    returnBook: builder.mutation<
      ApiResponse<string>,
      { bookId: string; email: string }
    >({
      query: ({ bookId, email }) => ({
        url: `/return-borrowed-book/${bookId}`, // Corrected URL path
        method: "POST",
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
