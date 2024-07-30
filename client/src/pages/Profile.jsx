import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { token, setToken, isAdmin } = useContext(Context); // Assuming isAdmin is available in your context
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);

  // Function to fetch user profile including address from backend
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("https://car-dealership-cs3o.onrender.com/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      setAddress(response.data.user.address);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError(error.response.data.message || error.message);
      setLoading(false);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  // Function to handle account deletion
  const removeAccount = async () => {
    try {
      const response = await axios.delete("https://car-dealership-cs3o.onrender.com/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUser(null);
      setAddress(null);
      handleLogout();
    } catch (error) {
      console.error("Error deleting account:", error);
      setError(error.response.data.message || error.message);
    }
  };

  // Function to navigate to update profile route
  const handleUpdate = () => {
    navigate("/update");
  };

  // Function to navigate to edit address route
  const handleEditAddress = () => {
    navigate("/editaddress");
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
                  src={`https://car-dealership-cs3o.onrender.com/${user.profileImage}`}
                  alt="Profile"
                />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold">{user.username}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              {address ? (
                <div className="mt-4">
                  <p className="text-lg font-bold">Address:</p>
                  <p>{address.city}, {address.country}</p>
                  <p>Phone: {address.phone}</p>
                  <p>Pin Code: {address.pinCode}</p>
                </div>
              ) : (null
              )}
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
