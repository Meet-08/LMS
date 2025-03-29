import { useState } from "react";
import { useRecordBorrowBookMutation } from "../store/api/borrowApi";
import { AppDispatch } from "../hooks/hooks";
import { useDispatch } from "react-redux";
import { toggleRecordBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { useFetchAllBooksQuery } from "../store/api/bookApi";

type props = {
  bookId: string;
};

const RecordBookPopup = ({ bookId }: props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { refetch } = useFetchAllBooksQuery();
  const [recordBorrowBook] = useRecordBorrowBookMutation();
  const [email, setEmail] = useState("");

  const handleRecordBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;
    try {
      await recordBorrowBook({ bookId, email }).unwrap();
      toast.success("Book borrowed successfully");
      refetch();
      dispatch(toggleRecordBookPopup());
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
          <h3 className="text-xl font-bold mb-4">Record Book</h3>
          <form onSubmit={handleRecordBook}>
            <div className="mb-4">
              <label>User Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Borrower's Email"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                type="button"
                onClick={() => dispatch(toggleRecordBookPopup())}
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RecordBookPopup;
