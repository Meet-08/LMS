import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAuth } from "../hooks/hooks";
import { logout } from "../store/slices/authSlice";
import { links } from "../constants/NavbarLinks";
import NavbarButton from "../components/NavbarButton";
import {
  toggleAddNewAdminPopup,
  toggleSettingPopup,
} from "../store/slices/popUpSlice";
import { AddNewAdminPopup, SettingPopup } from "../popups/popups";

type props = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedComponent: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = ({
  isSideBarOpen,
  setIsSideBarOpen,
  setSelectedComponent,
}: props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { addNewAdminPopup, settingPopup } = useSelector(
    (state: RootState) => state.popup
  );
  const { user, isAuthenticated } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <aside
        className={`${
          isSideBarOpen ? "left-0" : "-left-full"
        } z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`}
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-4 my-8">
          <img src={logo_with_title} alt="logo" />
        </div>

        <nav className="flex-1 px-6 space-y-2">
          {links.map((link) => (
            <NavbarButton
              key={link.icon}
              component={link.title}
              imageSrc={link.icon}
              onClick={() => setSelectedComponent(link.title)}
            />
          ))}

          {isAuthenticated && user?.role === "ADMIN" && (
            <>
              <button
                onClick={() => setSelectedComponent("Catalog")}
                className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
              >
                <img src={catalogIcon} alt="catalog" /> <span>Catalog</span>
              </button>
              <button
                onClick={() => setSelectedComponent("Users")}
                className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
              >
                <img src={usersIcon} alt="users" /> <span>Users</span>
              </button>
              <button
                className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
              >
                <RiAdminFill className="size-6" />
                <span>Add New Admin</span>
              </button>
            </>
          )}
          {isAuthenticated && user?.role === "USER" && (
            <NavbarButton
              component="My Borrowed Books"
              imageSrc={catalogIcon}
              onClick={() => setSelectedComponent("My Borrowed Books")}
            />
          )}
          <NavbarButton
            component="Update Credentials"
            imageSrc={settingIcon}
            onClick={() => dispatch(toggleSettingPopup())}
          />
        </nav>

        <div className="mx-auto">
          <button
            className="py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center justify-center w-full"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="icon" className="mx-2" />
            <span>Logout</span>
          </button>
        </div>
        <img
          src={closeIcon}
          alt="icon"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="size-fit absolute top-0 right-4 mt-4 block md:hidden"
        />
      </aside>
      {addNewAdminPopup && <AddNewAdminPopup />}
      {settingPopup && <SettingPopup />}
    </>
  );
};
export default Sidebar;
