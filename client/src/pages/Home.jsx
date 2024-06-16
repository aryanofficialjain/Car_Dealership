import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate("/login");
  };

  const handlesignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <button onClick={handlelogin}>Login</button>
      <button onClick={handlesignup}>Signup</button>
    </div>
  );
};

export default Home;
