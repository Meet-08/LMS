import { useDispatch } from "react-redux";
import { AppDispatch } from "../hooks/hooks";
import { useState } from "react";
import { useAddBookMutation } from "../store/api/bookApi";
import { toast } from "react-toastify";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [addBook] = useAddBookMutation();

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook({ title, author, description, price, quantity }).unwrap();
      toast.success("Book added successfully");
      setTitle("");
      setAuthor("");
      setDescription("");
      setPrice(0);
      setQuantity(0);
      dispatch(toggleAddBookPopup());
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-1/3 lg:w-2/4">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Record Book</h3>
          <form onSubmit={handleAddBook}>
            <div className="mb-4">
              <label>Book Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book Title"
                className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none"
              />
            </div>{" "}
            <div className="mb-4">
              <label>Book Author</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Book Author"
                className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label>Book Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Book Description"
                className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label>Book Price (Price for borrowing)</label>
              <input
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                placeholder="Book Price"
                className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label>Book Quantity</label>
              <input
                type="number"
                required
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                placeholder="Book Quantity"
                className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                type="button"
                onClick={() => dispatch(toggleAddBookPopup())}
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPopup;
