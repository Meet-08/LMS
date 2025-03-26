import { useFetchAllBooksQuery } from "../store/slices/bookSlice";
import { book } from "../interfaces/bookInterface";

const BookManagement = () => {
  const { data, isError } = useFetchAllBooksQuery();

  return (
    <div>
      {isError
        ? "Error fetching books"
        : data?.map((book: book) => (
            <div key={book.author}>{book.title}</div>
          )) || "No books found"}
    </div>
  );
};
export default BookManagement;
