import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { toast } from "react-toastify";
import { addNewAdmin } from "../store/slices/userSlice";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";
import keyIcon from "../assets/key.png";
import closeIcon from "../assets/close-square.png";
import placeHolder from "../assets/placeholder.jpg";

const AddNewAdminPopup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>();
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };
  const handleAddNewAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !avatar) {
      toast.warn("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatarFile", avatar);
    await dispatch(addNewAdmin(formData));
    dispatch(toggleAddNewAdminPopup());
    setName("");
    setEmail("");
    setPassword("");
    setAvatar(null);
    setAvatarPreview("");
  };

  return (
    <div className="fixed inset-0 bg-black p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-1/2">
        <div className="p-6">
          <header className="flex justify-between items-center mb-7 pb-5 border-b-[1px] border-black">
            <div className="flex items-center gap-3">
              <img
                src={keyIcon}
                alt="keyIcon"
                className="bg-gray-300 p-4 rounded-lg"
              />
              <h3 className="text-xl font-bold">Add new Admin</h3>
            </div>
            <img
              src={closeIcon}
              alt="closeIcon"
              className="hover:cursor-pointer"
              onClick={() => dispatch(toggleAddNewAdminPopup())}
            />
          </header>

          <form onSubmit={handleAddNewAdmin}>
            {/* Avatar Selection */}
            <div className="flex flex-col items-center mb-6">
              <label htmlFor="avatarInput" className="cursor-pointer">
                <img
                  src={avatarPreview ? avatarPreview : placeHolder}
                  alt="Avatar"
                  className="size-24 object-cover rounded-full"
                />
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Name</label>
              <input
                type="text"
                placeholder="Admin Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Email</label>
              <input
                type="email"
                placeholder="Admin Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Admin Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAdminPopup;
