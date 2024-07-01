import React, { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [filters, setFilters] = useState({
    carType: "",
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
      <select
        name="carType"
        value={filters.carType}
        onChange={handleChange}
        className="py-2 px-4 w-64 rounded-md focus:outline-none"
      >
        <option value="">Select Car Type</option>
        <option value="sedan">Sedan</option>
        <option value="suv">SUV</option>
        <option value="supercar">Supercar</option>
      </select>
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
