import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { toast } from "react-toastify";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const OTP = () => {
  const { email } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, message } = useAuth();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      navigate("/register");
      return;
    }
    dispatch(otpVerification(email, otp));
  };

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8 relative">
          <Link
            to="/register"
            className="border-2 border-black text-black rounded-3xl font-bold w-52 px-4 py-2 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
          >
            Back
          </Link>

          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden leading-14">
              Check your Mailbox
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter the OTP sent to your email address
            </p>
            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <input
                  type="number"
                  required
                  minLength={6}
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="border-2 rounded-lg w-full capitalize text-white bg-black font-semibold border-black py-2 hover:bg-white hover:text-black transition"
              >
                {loading ? "Verifying ..." : "Verify"}
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 bg-black text-white flex-col justify-center items-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-12">
              New to our Platform ? Sign up now
            </p>
            <Link
              to="/register"
              className="border-2 rounded-lg w-full capitalize text-white bg-black font-semibold border-white px-8 py-2 hover:bg-white hover:text-black transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
