import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import bg from "/bg.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/allcars");
  };

  return (
    <div className='bg-black w-screen h-screen'>
      <Navbar />
      <h1 className="text-white text-center mt-8 text-3xl">Welcome to Car Dealership</h1>
      
      <img src={bg} className='w-full h-[400px] object-cover' alt="" />
      <button onClick={handleClick} className='mx-auto mt-4 px-4 py-2 text-white bg-gray-900 rounded-md block hover:bg-gray-800'>
        Get Started
      </button>
    </div>
  );
};

export default Home;
