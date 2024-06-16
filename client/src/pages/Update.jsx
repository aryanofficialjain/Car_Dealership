import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [error, setError] = useState(null);
  const { token, setToken } = useContext(Context);
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    email: "",
    username: "",
    role: "user",
    profileImage: null, // Changed from 'file' to 'profileImage'
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
    console.log(formdata);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formdata.email);
      formDataToSend.append("username", formdata.username);
      formDataToSend.append("role", formdata.role);
      formDataToSend.append("oldpassword", formdata.oldpassword);
      formDataToSend.append("newpassword", formdata.newpassword);
      if (formdata.profileImage) { // Changed from 'file' to 'profileImage'
        formDataToSend.append("profileImage", formdata.profileImage);
      }

      const response = await axios.put(
        "http://localhost:8000/user/update",
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
    }} catch (error) {
      console.log(error);
      setError(error);
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>Update</div>
        <input
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          value={formdata.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Old Password"
          id="oldpassword"
          name="oldpassword"
          value={formdata.oldpassword}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="New Password"
          id="newpassword"
          name="newpassword"
          value={formdata.newpassword}
          onChange={handleChange}
        />

        <br />
        <input type="file" id="file" name="profileImage" onChange={handleChange} /> {/* Changed 'file' to 'profileImage' */}
        <select
          name="role"
          id="role"
          value={formdata.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Update</button>
      </form>
      {error && <p>{error.message}</p>}
    </>
  );
}};

export default Update;


