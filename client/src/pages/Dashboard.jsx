import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";

const CarTable = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const {token} = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch only the cars added by the current admin with populated buyer data
        const response = await fetch("https://car-dealership-frontend-indol.vercel.app/cart/buy", {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
          },
        });
        
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
  });

  const handleDeleteBuyer = async (carId, buyerId) => {
    try {
      const response = await fetch("https://car-dealership-frontend-indol.vercel.app/cart/buy", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure that the request is authenticated
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

  const handleCardDetail = (id) => {
    navigate(`/car/car/${id}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-center mb-4 text-2xl font-bold">Purchased Cars</h2>
        <div className="overflow-x-auto">
          <div className="shadow-md overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Car
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Profile Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light divide-y divide-gray-200">
                {cars.map((car) =>
                  car.buyers.map((buyer, index) => (
                    <tr
                      key={`${car._id}-${buyer._id}`}
                      className="hover:bg-gray-100"
                    >
                      {index === 0 && (
                        <td
                          rowSpan={car.buyers.length}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          <img
                            onClick={() => handleCardDetail(car._id)}
                            src={`https://car-dealership-frontend-indol.vercel.app/${car.carImages[0]}`}
                            alt=""
                            className="w-12 h-12 object-cover rounded-full cursor-pointer"
                          />
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">{buyer.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{buyer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={`https://car-dealership-frontend-indol.vercel.app/${buyer.profileImage}`}
                          alt="Profile"
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
      </div>
    </div>
  );
};

export default CarTable;