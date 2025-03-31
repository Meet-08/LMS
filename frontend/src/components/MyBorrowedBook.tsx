import { useState } from "react";
import { useGetUserBorrowedBooksQuery } from "../store/api/borrowApi";
import { book } from "../interfaces/bookInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../hooks/hooks";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import Header from "../layouts/Header";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { BookA } from "lucide-react";
import { useFetchAllBooksQuery } from "../store/api/bookApi";
import { formateDateTime } from "../constants/dateformetter";
import { ReadBookPopup } from "../popups/popups";
import { LoadingComponent } from "./component";

const MyBorrowedBook = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: userBorrowedBooks,
    isLoading: borrowedBooksLoading,
    isError: borrowedBooksError,
  } = useGetUserBorrowedBooksQuery();

  const { data: books } = useFetchAllBooksQuery();
  const { readBookPopup } = useSelector((state: RootState) => state.popup);
  const [readBook, setReadBook] = useState<book>();
  const openReadPopup = (book: book | undefined) => {
    if (!book) return toast.error("Book not found");
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const [filter, setFilter] = useState<"returned" | "not returned">("returned");

  const returnedBooks =
    userBorrowedBooks?.filter((book) => book.returned) || [];

  const nonReturnBooks =
    userBorrowedBooks?.filter((book) => !book.returned) || [];

  const booksToDisplay = filter === "returned" ? returnedBooks : nonReturnBooks;

  if (!borrowedBooksLoading && borrowedBooksError)
    return <div>Something went wrong</div>;

  if (borrowedBooksLoading)
    return <LoadingComponent size="large" className="h-screen" />;

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            Borrowed Books
          </h2>
        </header>

        <header className="flex flex-col gap-3 sm:flex-row md:items-center">
          <button
            className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg sm:rounded-bl-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
              filter === "returned"
                ? "bg-black text-white"
                : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300 cursor-pointer"
            }`}
            onClick={() => setFilter("returned")}
          >
            Returned Books
          </button>
          <button
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
              filter === "not returned"
                ? "bg-black text-white"
                : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300 cursor-pointer"
            }`}
            onClick={() => setFilter("not returned")}
          >
            Non Returned Books
          </button>
        </header>

        {booksToDisplay.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-center">ID</th>
                  <th className="px-4 py-2 text-center">Book Title</th>
                  <th className="px-4 py-2 text-center">Date & Time</th>
                  <th className="px-4 py-2 text-center">Due Date</th>
                  <th className="px-4 py-2 text-center">Returned</th>
                  <th className="px-4 py-2 text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {booksToDisplay.map((book, index) => (
                  <tr
                    key={book.id || index}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">{book.bookTitle}</td>
                    <td className="px-4 py-2 text-center">
                      {formateDateTime(book.borrowedDate)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {formateDateTime(book.dueDate)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {book.returned ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 flex space-x-2 my-3 justify-center">
                      <BookA
                        onClick={() =>
                          openReadPopup(
                            books?.find((b) => b.id === book.bookId)
                          )
                        }
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Typography variant="h3" color="secondary">
            No {filter === "returned" ? "returned" : "non returned"} books found
          </Typography>
        )}
      </main>
      {readBookPopup && <ReadBookPopup book={readBook} />}
    </>
  );
};
export default MyBorrowedBook;
