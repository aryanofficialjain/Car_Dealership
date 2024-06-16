import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"

const Signup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    username: "",
    role: "user",
    profileImage: null, 
  });

  
  const handlechange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setformdata((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create FormData object for multipart/form-data

    formData.append("email", formdata.email);
    formData.append("password", formdata.password);
    formData.append("username", formdata.username);
    formData.append("role", formdata.role);
    formData.append("profileImage", formdata.profileImage); // Append the file

    try {
      const response = await axios.post(
        "http://localhost:8000/user/signup",
        formData, // Send FormData instead of plain object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );

      // Handle successful response
      console.log(response.data);
      if (response.status === 200) {
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (error) {
      // Handle error
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Navbar/>
      <div className="bg-gray-300 mt-4 text-black p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-semibold mb-4 text-center">Signup</h2>
        <form onSubmit={handlesubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formdata.username}
              onChange={handlechange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-sm font-medium">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handlechange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formdata.role}
              onChange={handlechange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-900 hover:bg-purple-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Signup
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
      </div>
    </div>
  );
};

export default Signup;
