import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { book } from "../../interfaces/bookInterface";
import { ApiResponse } from "../../interfaces/ApiResponse";

const bookSlice = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/book`,
    credentials: "include",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query<book[], void>({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Book"],
    }),
    addBook: builder.mutation<string, book>({
      query: (book) => ({
        url: "/admin/add",
        method: "POST",
        body: book,
      }),
      transformResponse: (response: ApiResponse<string>) => {
        if (!response.success) throw new Error(response.errorResponse?.message);
        return response.data || "Something went wrong";
      },
      transformErrorResponse: (response) => {
        return {
          errorResponse: {
            message: response.data as string,
            statusCode: response.status as number,
          },
          success: false,
        };
      },
      invalidatesTags: ["Book"],
    }),
  }),
});

export const { useFetchAllBooksQuery, useAddBookMutation } = bookSlice;

export default bookSlice;
