import {
  useAddBookMutation,
  useFetchAllBooksQuery,
} from "../store/slices/bookSlice";
import { book } from "../interfaces/bookInterface";

const BookManagement = () => {
  const { data: book, isError, error } = useFetchAllBooksQuery();
  if (error) console.log(error);
  return (
    <div>
      {isError
        ? "Error fetching books"
        : book?.map((book: book) => (
            <div key={book.author}>{book.title}</div>
          )) || "No books found"}
    </div>
  );
};
export default BookManagement;
