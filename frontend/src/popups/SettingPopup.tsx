import { useState } from "react";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { useDispatch } from "react-redux";
import { updatePassword } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import settingIcon from "../assets/setting.png";
import closeIcon from "../assets/close-square.png";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { LoadingComponent } from "../components/component";

const SettingPopup = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useAuth();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
    } else {
      await dispatch(
        updatePassword({
          user,
          password: currentPassword,
          newPassword,
          confirmPassword: confirmNewPassword,
        })
      );
      dispatch(toggleSettingPopup());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3">
        <div className="p-6">
          <header className="flex justify-between items-center mb-7 pb-5 border-b-[1px] border-black">
            <div className="flex items-center gap-3">
              <img
                src={settingIcon}
                alt="settingIcon"
                className="bg-gray-300 p-4 rounded-lg"
              />
              <h3 className="text-xl font-bold">Change credentials</h3>
            </div>
            <img
              src={closeIcon}
              alt="closeIcon"
              className="hover:cursor-pointer"
              onClick={() => dispatch(toggleSettingPopup())}
            />
          </header>

          <form onSubmit={handleUpdatePassword}>
            <div className="mb-4 sm:flex gap-4 items-center">
              <label className="block text-gray-900 font-medium w-full">
                Current Password
              </label>
              <input
                type="text"
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="mb-4 sm:flex gap-4 items-center">
              <label className="block text-gray-900 font-medium w-full">
                New Password
              </label>
              <input
                type="password"
                minLength={8}
                maxLength={16}
                placeholder="Enter new Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-4 sm:flex gap-4 items-center">
              <label className="block text-gray-900 font-medium w-full">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter confirm password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-4 mt-10">
              <button
                type="button"
                onClick={() => dispatch(toggleSettingPopup())}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                {loading ? (
                  <LoadingComponent
                    size="small"
                    text="Updating..."
                    showText={true}
                    color="white"
                  />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SettingPopup;
