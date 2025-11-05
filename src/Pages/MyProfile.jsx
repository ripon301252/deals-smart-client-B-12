import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({ displayName: name, photoURL })
      .then(() =>{
        toast.success("Profile updated!")
      })
      .catch((err) => {
        toast.error(err.message)
      });
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex justify-center items-center px-4 py-8">
      <title>KidsToy - My Profile</title>

      <div className="card w-full max-w-md backdrop-blur-lg bg-white/10  rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          My Profile
        </h1>
        <p className="text-center text-white mb-6">
          Manage your <span className=" font-medium">
              <span className="text-black"> Smart </span>  <span className="text-[#5633e4]">Deals</span>
              </span> account
        </p>

        {/* Profile Info */}
        <div className="text-center mb-6">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto shadow-lg object-cover border-1 border-gray-300-300"
            />
          ) : (
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500 shadow-inner">
              👤
            </div>
          )}
          
          <p className="text-white font-semibold mt-2">
            {name || "No Name Set"}
          </p>
          <p className="text-sm text-white">{user?.email}</p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="label-text font-semibold text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full text-white bg-white/20 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="label-text font-semibold text-white">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              className="input input-bordered w-full text-white bg-white/20 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="btn bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold w-full hover:opacity-90"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
