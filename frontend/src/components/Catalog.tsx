import { useState } from "react";
import { useGetAllBorrowedBooksQuery } from "../store/api/borrowApi";
import { Typography } from "@mui/material";
import Header from "../layouts/Header";
import { BorrowBookRow } from "./component";
import ReturnBookPopup from "../popups/ReturnBookPopup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../hooks/hooks";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";

const Catalog = () => {
  const { returnBookPopup } = useSelector((state: RootState) => state.popup);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");

  const {
    data: allBorrowedBooks,
    isLoading,
    isError,
  } = useGetAllBorrowedBooksQuery();

  const [filter, setFilter] = useState<"borrowed" | "overdue">("borrowed");

  const openReturnBookPopup = (email: string, bookId: string) => {
    if (!email || !bookId) return;
    setEmail(email);
    setBorrowedBookId(bookId);
    dispatch(toggleReturnBookPopup());
  };

  const currentDate = new Date();
  const borrowedBooks =
    allBorrowedBooks?.filter(
      (book) => book.dueDate && book.dueDate > currentDate.toISOString()
    ) || [];

  const overdueBooks =
    allBorrowedBooks?.filter(
      (book) => book.dueDate && book.dueDate < currentDate.toISOString()
    ) || [];

  const booksToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />

        <header className="flex flex-col gap-3 sm:flex-row md:items-center">
          <button
            className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg sm:rounded-bl-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
              filter === "borrowed"
                ? "bg-black text-white"
                : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300 cursor-pointer"
            }`}
            onClick={() => setFilter("borrowed")}
          >
            Borrowed Books
          </button>
          <button
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
              filter === "overdue"
                ? "bg-black text-white"
                : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300 cursor-pointer"
            }`}
            onClick={() => setFilter("overdue")}
          >
            Overdue Borrowers
          </button>
        </header>

        {booksToDisplay.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-center">ID</th>
                  <th className="px-4 py-2 text-center">Username</th>
                  <th className="px-4 py-2 text-center">Email</th>
                  <th className="px-4 py-2 text-center">Price</th>
                  <th className="px-4 py-2 text-center">Due Date</th>
                  <th className="px-4 py-2 text-center">Date & Time</th>
                  <th className="px-4 py-2 text-center">Return</th>
                </tr>
              </thead>
              <tbody>
                {booksToDisplay.map((book, index) => (
                  <BorrowBookRow
                    key={book.id || index}
                    book={book}
                    index={index}
                    openReturnBookPopup={openReturnBookPopup}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Typography variant="h3" color="secondary">
            No {filter === "borrowed" ? "borrowed" : "overdue"} books found
          </Typography>
        )}
      </main>
      {returnBookPopup && (
        <ReturnBookPopup bookId={borrowedBookId} email={email} />
      )}
    </>
  );
};
export default Catalog;
