import { useDispatch } from "react-redux";
import { AppDispatch } from "../hooks/hooks";
import {
  useGetAllBorrowedBooksQuery,
  useReturnBookMutation,
} from "../store/api/borrowApi";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";

type props = {
  bookId: string;
  email: string;
};

const ReturnBookPopup = ({ bookId, email }: props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [returnBook, { isLoading }] = useReturnBookMutation();
  const { refetch } = useGetAllBorrowedBooksQuery();
  const handleReturnBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await returnBook({ bookId, email }).unwrap();
      toast.success("Book returned successfully");
      refetch();
      dispatch(toggleReturnBookPopup());
    } catch (error) {
      const errorMessage =
        (error as { data?: { data?: string } })?.data?.data ??
        (error as { message?: string })?.message ??
        "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-1/3 lg:w-2/4">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Return Book</h3>
          <form onSubmit={handleReturnBook}>
            <div className="mb-4">
              <label>User Email</label>
              <input
                type="email"
                readOnly
                defaultValue={email}
                placeholder="Borrower's Email"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                type="button"
                onClick={() => dispatch(toggleReturnBookPopup())}
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ReturnBookPopup;
