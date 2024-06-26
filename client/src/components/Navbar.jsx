// Navbar.js

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Navbar = () => {
  const { token } = useContext(Context);

  return (
    <nav className="bg-gray-900 p-4 flex justify-center items-center relative">
      <div className="relative z-20">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          {token ? (
            <>
            <li>
              <Link to="/profile" className="text-white hover:text-gray-300">
                Profile
              </Link>
            </li>
            <li>
              <a href="/cart" className="text-white hover:text-gray-300">
                Cart
              </a>
            </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
