import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { formateDate, formateDateTime } from "../constants/dateformetter";
import { borrowBook } from "../interfaces/bookInterface";
import { useUser } from "../hooks/hooks";

type props = {
  book: borrowBook;
  index: number;
  openReturnBookPopup: (email: string, bookId: string) => void;
};

const BorrowBookRow = ({ book, index, openReturnBookPopup }: props) => {
  const { user } = useUser(book.userId);

  return (
    <>
      <tr className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}>
        <td className="px-4 py-2 text-center">{index + 1}</td>
        <td className="px-4 py-2 text-center">{user?.name}</td>
        <td className="px-4 py-2 text-center">{user?.email}</td>
        <td className="px-4 py-2 text-center">{book.price}</td>
        <td className="px-4 py-2 text-center">{formateDate(book.dueDate)}</td>
        <td className="px-4 py-2 text-center">
          {formateDateTime(book.createdAt)}
        </td>
        <td className="px-4 py-2 flex space-x-2 my-3 justify-center">
          {book.returned ? (
            <FaSquareCheck className="size-6" />
          ) : (
            <PiKeyReturnBold
              onClick={() =>
                openReturnBookPopup(user?.email || "", book.bookId || "")
              }
              className="size-6 cursor-pointer"
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default BorrowBookRow;
