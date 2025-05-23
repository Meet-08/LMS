import { book } from "../interfaces/bookInterface";
import { AppDispatch } from "../hooks/hooks";
import { useDispatch } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";

type props = {
  book: book | undefined;
};

const ReadBookPopup = ({ book }: props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="fixed inset-0 bg-black/50 p-5 flex items-center justify-center z-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-2/4">
        <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-bold">View Book Info</h2>
          <button
            className="hover:cursor-pointer text-white font-bold text-lg"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Book Title
            </label>
            <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book?.title}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Author</label>
            <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book?.author}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book?.description}
            </p>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 bg-gray-100 rounded-b-lg">
          <button
            className="px-4 py-2 bg-gray-200  text-black rounded-md hover:bg-gray-300"
            type="button"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;
