import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { token, setToken } = useContext(Context);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/update");
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const removeAccount = async () => {
    try {
      const response = await axios.delete("http://localhost:8000/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUser(null); // Assuming that the user data should be cleared after account deletion
        handleLogout(); // Log out user after deleting the account
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <div>
      {user && (
        <>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <img src={`http://localhost:8000/${user.profileImage}`} alt="Profile" />
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={removeAccount}>Delete Account</button>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Profile;
