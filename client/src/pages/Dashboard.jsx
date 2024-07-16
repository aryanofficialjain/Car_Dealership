import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const CarTable = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/cart/buy");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCars(data.cars); // Assuming 'cars' is returned as an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (show error message, etc.)
      }
    };

    fetchData();
  }, []);

  const handleDeleteBuyer = async (carId, buyerId) => {
    try {
      const response = await fetch("http://localhost:8000/cart/buy", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId, buyerId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete buyer");
      }

      // Update state to remove the deleted buyer from UI
      const updatedCars = cars.map((car) => {
        if (car._id === carId) {
          car.buyers = car.buyers.filter((buyer) => buyer._id !== buyerId);
        }
        return car;
      });

      setCars(updatedCars);
    } catch (error) {
      console.error("Error deleting buyer:", error);
    }
  };

  const handlecardetail = (id) => {
    navigate(`/car/car/${id}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-center mb-4 text-2xl font-bold">Purchased Cars</h2>
        <table className="min-w-full bg-white border-collapse border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Car</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Profile Image</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {cars.map((car) =>
              car.buyers.map((buyer, index) => (
                <tr
                  key={`${car._id}-${buyer._id}`}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  {index === 0 && (
                    <td
                      rowSpan={car.buyers.length}
                      className="py-3 px-6 text-left"
                    >
                      <img
                        onClick={() => handlecardetail(car._id)}
                        src={`http://localhost:8000/car/${car.carImages[0]}`}
                        alt=""
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </td>
                  )}
                  <td className="py-3 px-6 text-left">{buyer.username}</td>
                  <td className="py-3 px-6 text-left">{buyer.email}</td>
                  <td className="py-3 px-6 text-left">
                    <img
                      src={`http://localhost:8000/${buyer.profileImage}`}
                      alt="Profile"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => handleDeleteBuyer(car._id, buyer._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarTable;
