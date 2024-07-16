import React, { useContext, useState } from 'react';
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
        'http://localhost:8000/cart/address', // Adjust the API endpoint as per your backend
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

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Address</h2>
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
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
