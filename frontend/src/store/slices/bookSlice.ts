import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { book } from "../../interfaces/bookInterface";

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
  }),
});

export const { useFetchAllBooksQuery } = bookSlice;

export default bookSlice;
