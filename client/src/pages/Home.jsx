import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bg from "/bg.jpg";

const Home = () => {

  const navigate = useNavigate();

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