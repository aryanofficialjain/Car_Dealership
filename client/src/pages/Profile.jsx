import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { token, setToken, setIsAdmin } = useContext(Context);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State for managing loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile information from backend
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user); // Assuming response.data.user contains user data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError(error.response.data.message || error.message);
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setToken(null);
    setIsAdmin(null);
    navigate("/login");
  };

  // Function to handle account deletion
  const removeAccount = async () => {
    try {
      const response = await axios.delete("http://localhost:8000/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(null); // Clear user data after account deletion
      handleLogout(); // Log out user after deleting the account
    } catch (error) {
      console.error("Error deleting account:", error);
      setError(error.response.data.message || error.message);
    }
  };

  // Function to navigate to the update profile route
  const handleUpdate = () => {
    navigate("/update");
  };

  // Effect to fetch user profile data when token changes
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <div className="container mx-auto p-4">
        {user && (
          <div className="max-w-md mx-auto bg-black text-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-center">
                <img
                  className="rounded-full w-20 h-20"
                  src={`http://localhost:8000/${user.profileImage}`}
                  alt="Profile"
                />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold">{user.username}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Logout
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update
                </button>
                <button
                  onClick={removeAccount}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Profile;
