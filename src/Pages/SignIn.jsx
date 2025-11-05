import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

const SignIn = () => {
  const { signInUser, popupGoogleSignin, setUser } = use(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    signInUser(email, password)
      .then(() => {
        e.target.reset();
        toast.success("Your Signin Successful");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleGoogleSignin = () => {
    popupGoogleSignin()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        // create user in the database
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((result) => result.json())
          .then((data) => {
            console.log("data after user save", data );
          });

        setUser(result.user);
        toast.success("Google Signin successful");
        navigate(location?.state || "/");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="md:min-h-screen py-5 flex items-center justify-center  bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 px-4">
      <title>KidsToy - SignIn</title>

      <div className="card w-full max-w-md backdrop-blur-lg bg-white/10 shadow-2xl border border-white/50 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Welcome Back
        </h1>

        <form onSubmit={handleSignin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full text-white bg-white/20"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered w-full pr-10 text-white bg-white/20"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={handleTogglePasswordShow}
                className="absolute top-2.5 right-3 text-pink-500 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <IoEyeOff className="text-2xl" />
                ) : (
                  <IoEye className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to={`/forgotPassword`}
              className="text-pink-600 text-sm hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-pink-500 to-purple-500 border-none text-white font-semibold hover:scale-105 transition-transform border-none shadow-none"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-gray-300"></div>
            <span className="text-white text-sm">or</span>
            <div className="h-px w-16 bg-gray-300"></div>
          </div>

          {/* Google Signin */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="google-btn"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Signup Link */}
          <p className="text-center text-white text-sm mt-4">
            Don't have an account? Please{" "}
            <Link
              to={`/signup`}
              className="text-pink-600 font-semibold hover:underline "
            >
              Sign Up
            </Link>
          </p>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-xs text-center font-semibold mt-2">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
