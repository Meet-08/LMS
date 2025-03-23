import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../layouts/Sidebar";
import {
  AdminDashboard,
  BookManagement,
  Catalog,
  Users,
  UserDashboard,
  MyBorrowedBook,
} from "../components/component";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { Navigate, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getUser, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [selectedComponent, setselectedComponent] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { user, isAuthenticated, loading, error, message, authChecked } =
    useAuth();

  useEffect(() => {
    (async () => {
      await dispatch(getUser());
    })();
  }, [dispatch, getUser]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }

    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, message, loading, authChecked, user]);

  if (loading || !authChecked) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="relative md:pl-64 min-h-screen bg-gray-100">
        <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md size-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
        </div>
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          setSelectedComponent={setselectedComponent}
        />
        {(() => {
          switch (selectedComponent) {
            case "Dashboard":
              return user?.role === "USER" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );

            case "Books":
              return <BookManagement />;
            case "Catalog":
              if (user?.role === "ADMIN") {
                return <Catalog />;
              }
              break;
            case "Users":
              if (user?.role === "ADMIN") {
                return <Users />;
              }
              break;
            case "My Borrowed Books":
              return <MyBorrowedBook />;
            default:
              return user?.role === "USER" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
          }
        })()}
      </div>
    </>
  );
};

export default Home;
