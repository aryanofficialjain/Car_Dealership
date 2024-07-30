import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Update = () => {
  const [error, setError] = useState(null);
  const { token } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    role: "user",
    profileImage: null,
    oldpassword: "",
    newpassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("oldpassword", formData.oldpassword);
      formDataToSend.append("newpassword", formData.newpassword);
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      const response = await axios.put(
        "https://car-dealership-server-6i5y.onrender.com/user/update",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Update failed:", error);
      setError(error);
    }
  };
  
  return (
    <div className="flex flex-col bg-gray-900 items-center justify-center min-h-screen bg-gray-50">
      <Navbar/>
      <div className="max-w-md w-full mx-auto p-8 bg-black text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Update Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Old Password"
              id="oldpassword"
              name="oldpassword"
              value={formData.oldpassword}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              id="newpassword"
              name="newpassword"
              value={formData.newpassword}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              id="file"
              name="profileImage"
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </div>
    </div>
  );
};

export default Update;
