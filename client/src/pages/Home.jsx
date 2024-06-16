// Home.js

import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import bg from "/bg.jpg";

const Home = () => {
  return (
    <div className='bg-black'>
      <Navbar />
      <SearchBar />
      <h1 className="text-white text-center mt-8 text-3xl">Welcome to Car Dealership</h1>
      <img src={bg} className='w-[100%] h-[470px] object-cover' alt="" />
    </div>
  );
};

export default Home;
