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

  const handlePriceRangeChange = (e) => {
    const selectedRange = e.target.value;
    if (selectedRange === "any") {
      setFilters({ ...filters, priceFrom: "", priceTo: "" });
    } else {
      const [from, to] = selectedRange.split("-");
      setFilters({ ...filters, priceFrom: from, priceTo: to });
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 text-black">
      <div className="relative flex items-center">
        <select
          name="priceRange"
          value={`${filters.priceFrom}-${filters.priceTo}`}
          onChange={handlePriceRangeChange}
          className="py-2 px-4 w-64 rounded-md focus:outline-none"
        >
          <option value="any">Any Price</option>
          <option value="0-500000">0 - 5 lakhs</option>
          <option value="500001-1000000">5 - 10 lakhs</option>
          <option value="1000001-1500000">10 - 15 lakhs</option>
          {/* Add more options as needed */}
        </select>
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
