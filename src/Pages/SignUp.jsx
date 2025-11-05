import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

const SignUp = () => {
  const { createUser, setUser, updateUser, popupGoogleSignin } =
    useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nameerror, setNameError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      toast.error("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    setSuccess(false);

    const length6Pattern = /^.{6,}$/;
    const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

    if (!length6Pattern.test(password)) {
      setError("Password must be 6 characters or longer");
      toast.error("Password must be 6 characters or longer");
      return;
    } else if (!casePattern.test(password)) {
      setError(
        "Password must have at least one uppercase and one lowercase character"
      );
      toast.error(
        "Password must have at least one uppercase and one lowercase character"
      );
      return;
    }

    createUser(email, password)
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
            console.log("data after user save", data);
          });
        const user = result.user;
        setSuccess(true);
        e.target.reset();
        toast.success("Your SignUp Successful");
        updateUser({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((err) => {
            toast.error(err.message);
            setUser(user);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center md:min-h-screen py-5  bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 px-4">
      <title>KidsToy - SignUp</title>

      <div className="card w-full max-w-md backdrop-blur-lg bg-white/10 shadow-2xl rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          Create Account
        </h1>
        <p className="text-center text-white mb-4">
          Join <span className="font-semibold text-pink-600">Smart Deals</span>{" "}
          today!
        </p>

        <form onSubmit={handleSignup} className="space-y-3">
          {/* Name */}
          <div>
            <label className="label-text text-white font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full text-white bg-white/20 "
              placeholder="Your Name"
              required
            />
            {nameerror && (
              <p className="text-xs text-red-500 mt-1">{nameerror}</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="label-text text-white font-semibold">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              className="input input-bordered w-full text-white bg-white/20"
              placeholder="Your Photo URL"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label-text text-white font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full text-white bg-white/20"
              placeholder="Your Email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label-text text-white font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered w-full text-white bg-white/20"
                placeholder="Password"
                required
              />
              <button
                onClick={handleTogglePasswordShow}
                type="button"
                className="absolute right-3 top-2.5 text-2xl text-pink-500 cursor-pointer"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold w-full mt-4 hover:opacity-90 hover:scale-105 transition-transform border-none shadow-none"
          >
            Sign Up
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
            onClick={() => {
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
                      console.log("data after user save", data);
                    });
                  setUser(result.user);
                  toast.success("Google SignUp Successful");
                  navigate("/");
                })
                .catch((e) => {
                  toast.error(e.message);
                });
            }}
            className="google-btn"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center mt-3 text-sm text-white">
            Already have an account? Please{" "}
            <Link
              to={`/signin`}
              className="text-pink-600 hover:underline font-medium "
            >
              Sign In
            </Link>
          </p>

          {success && (
            <p className="text-green-500 text-center font-semibold">
              Account created successfully!
            </p>
          )}
          {error && (
            <p className="text-red-500 text-center font-semibold">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
