import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAuth } from "../hooks/hooks";
import { useFetchAllBooksQuery } from "../store/slices/bookSlice";
import { useEffect, useState } from "react";
import { book } from "../interfaces/bookInterface";
import {
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
} from "../store/slices/popUpSlice";
import Header from "../layouts/Header";
import { AddBookPopup, ReadBookPopup, RecordBookPopup } from "../popups/popups";

const BookManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useAuth();
  const { data: books } = useFetchAllBooksQuery();
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector(
    (state: RootState) => state.popup
  );
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchedBooks, setSearchedBooks] = useState<book[]>(books || []);

  const [readBook, setReadBook] = useState<book>();
  const openReadPopup = (book: book) => {
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const [borrowBookId, setBorrowBookId] = useState<string>();
  const openRecordPopup = (bookId: string) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };

  useEffect(() => {
    setSearchedBooks(
      books?.filter((book) =>
        book.title.toLowerCase().includes(searchKeyWord.toLowerCase())
      ) || []
    );
  }, [searchKeyWord, books]);

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            {user && user.role === "ADMIN" ? "Book Management" : "Books"}
          </h2>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {user?.role === "ADMIN" && (
              <button
                onClick={() => dispatch(toggleAddBookPopup())}
                className="relative cursor-pointer pl-14 w-full sm:w-52 flex gap-4 justify-center items-center py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
              >
                <span className="bg-white flex justify-center items-end overflow-hidden rounded-full text-black size-9 text-4xl absolute left-5">
                  +
                </span>
                Add Book
              </button>
            )}
            <input
              type="text"
              placeholder="Search books"
              className="w-full sm:w-52 border p-2 border-gray-300 rounded-md"
              value={searchKeyWord}
              onChange={(e) => setSearchKeyWord(e.target.value.toLowerCase())}
            />
          </div>
        </header>

        {books && books.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Author</th>
                  {isAuthenticated && user?.role === "ADMIN" && (
                    <th className="px-4 py-2">Quantity</th>
                  )}
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Availability</th>
                  {isAuthenticated && user?.role === "ADMIN" && (
                    <th className="px-4 py-2">Record Book</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {searchedBooks?.map((book, index) => (
                  <tr
                    key={book._id || index}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">{book.title}</td>
                    <td className="px-4 py-2 text-center">{book.author}</td>
                    {isAuthenticated && user?.role === "ADMIN" && (
                      <th className="px-4 py-2">{book.quantity}</th>
                    )}
                    <td className="px-4 py-2 text-center">{book.price}</td>
                    <td className="px-4 py-2 text-center">
                      {book.availability ? "Available" : "Not Available"}
                    </td>
                    {isAuthenticated && user?.role === "ADMIN" && (
                      <td className="px-4 py-2 flex space-x-2 my-3 justify-center">
                        <BookA
                          onClick={() => console.log("To DO")}
                          className="cursor-pointer"
                        />
                        <NotebookPen
                          onClick={() => console.log("To DO")}
                          className="cursor-pointer"
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium">
            No books found in library.
          </h3>
        )}
      </main>
      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup bookId={readBook?._id || ""} />}
      {recordBookPopup && <RecordBookPopup />}
    </>
  );
};
export default BookManagement;
