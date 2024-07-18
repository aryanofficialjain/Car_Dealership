import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import Navbar from '../components/Navbar';

const Address = () => {
  const navigate = useNavigate();
  const { token } = useContext(Context);

  const [formData, setFormData] = useState({
    city: '',
    country: '',
    phone: '',
    pinCode: '',
  });

  const [existingAddress, setExistingAddress] = useState(null); // State to store existing address data

  // Fetch existing address on component mount
  useEffect(() => {
    fetchExistingAddress();
  }, []);

  // Function to fetch existing address
  const fetchExistingAddress = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/address', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.address) {
        setExistingAddress(response.data.address);
      }
    } catch (error) {
      console.error('Error fetching existing address:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        'http://localhost:8000/user/address',
        formData,
        config
      );

      console.log(response.data); // Log success message or handle response as needed

      if (response.status === 200) {
        navigate('/pay'); // Redirect upon successful submission
      }
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Error adding address. Please try again.');
    }
  };

  // Function to handle deleting existing address
  const handleDeleteAddress = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/user/address', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setExistingAddress(null); // Clear existing address state upon successful deletion
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Error deleting address. Please try again.');
    }
  };

  const next = () => {
    navigate("/pay");
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />

      <button onClick={next}>Next</button>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {existingAddress ? 'Edit Address' : 'Add Address'}
        </h2>
        {existingAddress ? (
          <div>
            <p className="text-lg font-bold">Existing Address:</p>
            <p>{existingAddress.city}, {existingAddress.country}</p>
            <p>Phone: {existingAddress.phone}</p>
            <p>Pin Code: {existingAddress.pinCode}</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => navigate('/editaddress')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit Address
              </button>
              <button
                onClick={handleDeleteAddress}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Delete Address
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium">
                Country:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pinCode" className="block text-sm font-medium">
                Pin Code:
              </label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {existingAddress ? 'Update Address' : 'Add Address'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Address;
