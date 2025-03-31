import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { toast } from "react-toastify";
import {
  getUser,
  resetAuthSlice,
  resetPassword,
} from "../store/slices/authSlice";
import logo_with_title from "../assets/logo-with-title.png";
import logo from "../assets/black-logo.png";
import { LoadingComponent } from "../components/component";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
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

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (token) {
      dispatch(resetPassword({ password, confirmPassword }, token));
      dispatch(getUser());
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
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
            to="/password/forgot"
            className="border-2 border-black bg-white rounded-3xl font-bold w-52 px-4 py-2 fixed top-10 -left-28  transition duration-300 text-end"
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
              Reset Password
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter your new password
            </p>
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="mb-4">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="border-2 rounded-lg w-full capitalize text-white bg-black font-semibold border-black py-2 hover:bg-white hover:text-black transition"
              >
                {loading ? (
                  <LoadingComponent
                    size="small"
                    text="Resetting..."
                    showText={true}
                    color="white"
                  />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
