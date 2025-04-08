import { useState } from "react";
import { useGetAllBorrowedBooksQuery } from "../store/api/borrowApi";
import { Typography } from "@mui/material";
import Header from "../layouts/Header";
import { LoadingComponent } from "./component";
import ReturnBookPopup from "../popups/ReturnBookPopup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useUser } from "../hooks/hooks";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { formateDate, formateDateTime } from "../constants/dateformetter";
import { FaSquareCheck } from "react-icons/fa6";
import { PiKeyReturnBold } from "react-icons/pi";

const Catalog = () => {
  const { returnBookPopup } = useSelector((state: RootState) => state.popup);
  const { users } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");

  const { data: allBorrowedBooks, isLoading } = useGetAllBorrowedBooksQuery();

  const [filter, setFilter] = useState<"borrowed" | "overdue">("borrowed");

  const openReturnBookPopup = (email: string, bookId: string) => {
    if (!email || !bookId) return;
    setEmail(email);
    setBorrowedBookId(bookId);
    dispatch(toggleReturnBookPopup());
  };

  const currentDate = new Date();
  const borrowedBooks =
    allBorrowedBooks?.filter((book) => {
      if (!book.dueDate) return false;
      const dueDate = new Date(book.dueDate);
      return dueDate > currentDate;
    }) || [];

  const overdueBooks =
    allBorrowedBooks?.filter((book) => {
      if (!book.dueDate) return false;
      const dueDate = new Date(book.dueDate);
      return dueDate < currentDate;
    }) || [];

  const booksToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;

  if (isLoading) {
    return <LoadingComponent size="large" className="h-screen" />;
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
                {booksToDisplay.map((book, index) => {
                  const user = users?.find((u) => u.id === book.userId);
                  if (user) {
                    return (
                      <tr
                        className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                        key={book.id || index}
                      >
                        <td className="px-4 py-2 text-center">{index + 1}</td>
                        <td className="px-4 py-2 text-center">{user?.name}</td>
                        <td className="px-4 py-2 text-center">{user?.email}</td>
                        <td className="px-4 py-2 text-center">{book.price}</td>
                        <td className="px-4 py-2 text-center">
                          {formateDate(book.dueDate)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {formateDateTime(book.createdAt)}
                        </td>
                        <td className="px-4 py-2 flex space-x-2 my-3 justify-center">
                          {book.returned ? (
                            <FaSquareCheck className="size-6" />
                          ) : (
                            <PiKeyReturnBold
                              onClick={() =>
                                openReturnBookPopup(
                                  user?.email || "",
                                  book.bookId || ""
                                )
                              }
                              className="size-6 cursor-pointer"
                            />
                          )}
                        </td>
                      </tr>
                    );
                  }
                  return <LoadingComponent key={index} size="small" />;
                })}
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
