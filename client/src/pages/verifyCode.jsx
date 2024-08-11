import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const { username } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://car-dealership-cs3o.onrender.com/user/username/${username}`, {
        code,
      });
      
      if (response.status === 200) {
        navigate("/login");
      } else {
        setError("Error while verifying the user");
      }
    } catch (err) {
      console.error("Error during verification:", err);
      setError("An error occurred while verifying the user.");
    }
  };

  return (
    <div>
      <h1>Verify User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={code}
          name="code"
          onChange={(e) => setCode(e.target.value)}
          placeholder="Verification Code"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VerifyCode;