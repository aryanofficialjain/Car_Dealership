import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State variables
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    username: "",
    role: "user",
    profileImage: null, // For storing the selected file
  });

  // Event handler for form field changes
  const handlechange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setformdata((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Event handler for form submission
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create FormData object for multipart/form-data

    // Append form fields to FormData
    formData.append("email", formdata.email);
    formData.append("password", formdata.password);
    formData.append("username", formdata.username);
    formData.append("role", formdata.role);
    formData.append("profileImage", formdata.profileImage); // Append the file

    try {
      // Send form data to the server
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
    <>
      {/* Signup form */}
      <form onSubmit={handlesubmit} encType="multipart/form-data">
        <div>Signup</div>
        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          value={formdata.username}
          onChange={handlechange}
        />
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={formdata.email}
          onChange={handlechange}
        />
        <br />
        {/* Password input field */}
        <input
          type="password"
          value={formdata.password}
          placeholder="Password"
          id="password"
          name="password"
          onChange={handlechange}
        />
        {/* Profile image file input field */}
        <input type="file" id="profileImage" name="profileImage" onChange={handlechange} />
        {/* Role selection dropdown */}
        <select
          name="role"
          id="role"
          value={formdata.role}
          onChange={handlechange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {/* Signup button */}
        <button type="submit">Signup</button>
      </form>
      {/* Error message display */}
      {error && <p>{error.message}</p>}
    </>
  );
};

export default Signup;
