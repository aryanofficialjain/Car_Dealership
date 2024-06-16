// SearchBar.js

import React from "react";

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Your Dream Car"
          className="py-2 px-4 w-64 sm:w-80 rounded-l-md focus:outline-none"
        />
        <button className="bg-gray-900 hover:bg-purple-700 text-white py-2 px-4 rounded-r-md">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
