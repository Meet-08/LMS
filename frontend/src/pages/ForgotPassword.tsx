import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import logo_with_title from "../assets/logo-with-title.png";
import logo from "../assets/black-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, message, isAuthenticated, authChecked } = useAuth();

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [error, loading, authChecked, message, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col justify-center items-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center h-[450px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">
              "Your premier library for borrowing and reading books"
            </h3>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8 relative">
          <Link
            to="/register"
            className="border-2 border-black text-black rounded-3xl font-bold w-52 px-4 py-2 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
          >
            Back
          </Link>
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-between">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden leading-14">
              Forgot Password?
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Enter your registered email address to reset your password.
            </p>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="border-2 rounded-lg w-full capitalize text-white bg-black font-semibold border-black py-2 hover:bg-white hover:text-black transition"
              >
                {loading ? "Sending Reset password Token" : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
