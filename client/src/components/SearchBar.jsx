// SearchBar.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ handleSearch }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    carType: "",
    brand: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchClick = () => {
    handleSearch(filters);
  };

  return (
    <div className="flex justify-center items-center mt-8 text-black">
      <div className="relative flex items-center">
        <input
          type="text"
          name="priceFrom"
          placeholder="Price from"
          value={filters.priceFrom}
          onChange={handleChange}
          className="py-2 px-4 w-32 sm:w-40 rounded-l-md focus:outline-none"
        />
        <input
          type="text"
          name="priceTo"
          placeholder="Price to"
          value={filters.priceTo}
          onChange={handleChange}
          className="py-2 px-4 w-32 sm:w-40 rounded-r-md focus:outline-none"
        />
      </div>
      <input
        type="text"
        name="carType"
        placeholder="Car type"
        value={filters.carType}
        onChange={handleChange}
        className="py-2 px-4 ml-4 w-40 sm:w-48 rounded-md focus:outline-none"
      />
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={filters.brand}
        onChange={handleChange}
        className="py-2 px-4 ml-4 w-40 sm:w-48 rounded-md focus:outline-none"
      />
      <button
        className="bg-purple-900 hover:bg-purple-700 text-white py-2 px-4 ml-4 rounded-md"
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
