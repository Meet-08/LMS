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
  LoadingComponent,
} from "../components/component";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { user, error, message, isAuthenticated, authChecked, loading } =
    useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, message, authChecked]);

  if (loading || !authChecked) {
    return <LoadingComponent size="large" className="h-screen" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
          setSelectedComponent={setSelectedComponent}
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
