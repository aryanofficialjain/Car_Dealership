import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

const AllCar = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true); // State for managing loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("https://car-dealership-4cnd.onrender.com/car/allcars");
        setCars(response.data);
        setFilteredCars(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(error.message);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (filters) => {
    let filtered = cars.filter((car) => {
      let passFilter = true;
      
      if (filters.carType && car.type.toLowerCase() !== filters.carType.toLowerCase()) {
        passFilter = false;
      }
      
      return passFilter;
    });

    setFilteredCars(filtered);
  };

  const handleClick = (id) => {
    navigate(`/car/car/${id}`);
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
        <div className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <SearchBar handleSearch={handleSearch} />
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">All Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              onClick={() => handleClick(car._id)}
              className="bg-black rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center mb-4">
                {car.carImages && car.carImages.length > 0 && (
                  <img
                    src={`https://car-dealership-4cnd.onrender.com/car/${car.carImages[0]}`}
                    alt={`${car.brand} ${car.type}`}
                    className="max-w-full h-auto rounded-lg"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-center">
                  {car.brand}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCar;
