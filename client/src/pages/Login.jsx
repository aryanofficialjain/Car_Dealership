import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component
import { Context } from "../context/Context";

const Login = () => {
  const [error, setError] = useState(null);
  const { setToken } = useContext(Context); // Assuming you have a Context for managing state
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({ email: "", password: "" });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        formdata
      );
      if (response.status === 200) {
        setToken(response.data.token);
        navigate("/profile");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-300 mt-8 p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
          <form onSubmit={handlesubmit}>
            <div className="mb-6">
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
            <div className="mb-6">
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
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-900 hover:bg-purple-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">Login Failed</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
