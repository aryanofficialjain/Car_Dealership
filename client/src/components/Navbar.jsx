// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black p-4 flex justify-center items-center relative">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="/path/to/your/car/image.jpg"
          alt="Car Background"
        />
        <div className="bg-black opacity-75 absolute inset-0 z-10"></div>
      </div>
      <div className="relative z-20">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-white hover:text-gray-300">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
