import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { AppDispatch, useAuth } from "../hooks/hooks";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import logo_with_title from "../assets/logo-with-title.png";
import logo from "../assets/black-logo.png";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, error, message, loading } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate(`/otp-verification/${email}`);
    }

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

  return (
    <>
      <div className="flex justify-center md:flex-row h-screen">
        {/* Left side */}
        <div className="hidden md:flex w-full md:w-1/2 bg-black text-white flex-col justify-center items-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center h-[376px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-12">
              Already have Account ? Sign in now
            </p>
            <Link
              className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition"
              to="/login"
            >
              Sign In
            </Link>
          </div>
        </div>
        {/* Right side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
                <h3 className="font-medium text-4xl overflow-hidden leading-16">
                  Sign Up
                </h3>
                <img
                  src={logo}
                  alt="logo"
                  className="h-auto w-24 object-cover"
                />
              </div>
            </div>
            <p className="text-gray-800 text-center mb-12">
              Please provide your details below to sign up
            </p>

            <form onSubmit={handleRegister}>
              <div className="mb-4 ">
                <TextField
                  variant="outlined"
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    width: "100%",
                    my: 1,
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "black",
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    width: "100%",
                    my: 1,
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "black",
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    width: "100%",
                    my: 1,
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "black",
                    },
                  }}
                />
              </div>
              <div className="block md:hidden font-semibold my-4 ">
                <p>
                  Already have Account ?{" "}
                  <Link
                    to="/login"
                    className="text-sm text-gray-500 hover:underline "
                  >
                    Sign In
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="border-2 rounded-lg w-full capitalize text-white bg-black font-semibold border-black py-2 hover:bg-white hover:text-black transition"
              >
                {loading ? "Registering ..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
