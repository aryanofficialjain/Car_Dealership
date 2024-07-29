import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import bg from "/bg.jpg";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8000/car/allcars",  {withCredentials: true});
        console.log(response.data); // Log the response data
        setCars(Array.isArray(response.data) ? response.data : []); // Ensure cars is an array
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("An error occurred while fetching cars.");
      }
    };
  
    fetchCars();
  }, []);
  

  const handleClick = (carId) => {
    navigate(`/car/car/${carId}`);
  };

  const handleClickstart = () => {
    navigate("/allcars");
  };

  return (
    <div className='bg-black w-screen h-screen'>
      <Navbar />
      <h1 className="text-white text-center mt-8 text-3xl">Welcome to Car Dealership</h1>
      
      <img src={bg} className='w-full h-[700px] object-cover' alt="" />
      <button onClick={handleClickstart} className='mx-auto px-4 py-2 text-white bg-gray-900 rounded-md block hover:bg-gray-800'>
        Get Started
      </button>

    </div>
  );
};

export default Home;