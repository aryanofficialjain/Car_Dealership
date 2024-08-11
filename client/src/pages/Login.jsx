import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component

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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-black text-white mt-8 p-8 rounded-lg shadow-lg w-full sm:max-w-md">
          <h2 className="text-3xl font-semibold mb-4 text-center">Verify Code</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="code" className="block text-sm font-medium">
                Verification Code
              </label>
              <input
                type="number"
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the verification code"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-900 hover:bg-purple-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;