import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import bg from "/bg.jpg";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Axios request with credentials
        const response = await axios.get("https://car-dealership-server-03td.onrender.com/car/allcars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(error.message);
      }
    };

    fetchCars();
  }, []);

  const handleClick = (carId) => {
    navigate(`/car/car/${carId}`);
  };

  const handleClickstart = () => {
    navigate("/allcars");
  };

  return (
    <div className='bg-black w-screen h-screen'>
      <Navbar />
      <h1 className="text-white text-center mt-8 text-3xl">Welcome to Car Dealership</h1>
      
      <img src={bg} className='w-full h-[700px] object-cover m-2' alt="" />
      <button onClick={handleClickstart} className='mx-auto mt-4 mb-4 px-4 py-2 text-white bg-gray-900 rounded-md block hover:bg-gray-800'>
        Get Started
      </button>

      {/* Featured Cars Section */}
      <div className="w-full mx-auto py-8 bg-black">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Featured Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cars.slice(0, 6).map((car) => (
            <div
              key={car._id}
              onClick={() => handleClick(car._id)}
              className="bg-black rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center mb-4">
                {car.carImages && car.carImages.length > 0 && (
                  <img
                    src={`https://car-dealership-server-03td.onrender.com/car/${car.carImages[0]}`}
                    alt={`${car.brand} ${car.type}`}
                    className="max-w-full h-auto rounded-lg"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-center text-white">
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

export default Home;