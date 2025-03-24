import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  ForgotPassword,
  Home,
  Login,
  OTP,
  Register,
  ResetPassword,
} from "./pages/pages";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { AppDispatch, useAuth } from "./hooks/hooks";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

const App = () => {
  const { user, isAuthenticated, authChecked, error } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUser());
    };
    fetchUser();
    if (isAuthenticated && user?.role === "ADMIN") {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
};

export default App;
