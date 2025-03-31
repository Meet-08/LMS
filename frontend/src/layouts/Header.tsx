import { useEffect, useState } from "react";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { useDispatch } from "react-redux";
import userIcon from "../assets/user.png";
import settingIcon from "../assets/setting.png";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const hours = date.getHours() % 12 || 12;
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = date.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
      setCurrentDate(
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    const intervalId = setInterval(() => {
      updateDateTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          src={user?.avatarUrl || userIcon}
          alt="userIcon"
          className="size-12"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">
            {user?.name}
          </span>
          <span className="text-sm font-medium sm:text-lg sm:font-medium">
            {user?.role?.charAt(0).toUpperCase() +
              (user?.role?.slice(1) ?? "") || "N/A"}
          </span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
          <span>{currentTime}</span>
          <span>{currentDate}</span>
        </div>
        <span className="bg-black h-14 w-[2px]" />
        <img
          src={settingIcon}
          alt="settingIcon"
          className="h- 8 w-8 cursor-pointer"
          onClick={() => dispatch(toggleSettingPopup())}
        />
      </div>
    </header>
  );
};
export default Header;
