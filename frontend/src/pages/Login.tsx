import { useEffect, useState } from "react";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { useDispatch } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, error, message, loading, authChecked } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      dispatch(resetAuthSlice());
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [error, authChecked, message, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(email, password));
    navigate("/");
  };
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8 relative">
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden leading-14">
              Welcome Back !!
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter your credentials to login
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4 space-y-5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                />
                <input
                  type="password"
                  required
                  minLength={8}
                  maxLength={16}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-black rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                />
              </div>
              <Link to="/password/forgot" className="font-semibold text-black">
                Forgot Password
              </Link>
              <div className="block md:hidden mt-2">
                <p>
                  Don't have an account ?{" "}
                  <Link
                    to="/register"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="border-2 rounded-lg w-full mt-4 capitalize text-white bg-black font-semibold border-black py-2 hover:bg-white hover:text-black transition"
              >
                {loading ? "Sign In ... " : "Sign In"}
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

export default Login;
