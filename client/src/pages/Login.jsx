import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const { setToken } = useContext(Context);
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({ email: "", password: "" });
  console.log(error && error.message);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        formdata
      );
      console.log(response.data);
      console.log(response.data.token);
      if (response.status === 200) {
        setToken(response.data.token);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <div>Login</div>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={formdata.email}
          onChange={handlechange}
        />
        <br />
        <input
          type="password"
          value={formdata.password}
          placeholder="Password"
          id="password"
          name="password"
          onChange={handlechange}
        />
        <button type="submit">Login</button>
      </form>
      {error ? <p>Log In Failed </p> : "" }
    </>
  );
};

export default Login;
