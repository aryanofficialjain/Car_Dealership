import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:8000/car/allcars');
        setCars(res.data); 
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleUpdate = (id) => {
    console.log(id);
    navigate(`/update/${id}`)
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8000/car/car/${id}`);
      
      setCars(cars.filter(car => car._id !== id));
      console.log(`Deleted car with id ${id}`);
    } catch (error) {
      console.log('Error deleting car:', error.message);
    }
  };

  const handleAdd = () => {
    navigate("/addcar")
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
        <Navbar/>
      <div className="container mx-auto p-4">
        <h2 className="text-center mb-4 text-2xl font-bold">Car List</h2>
        <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">Add</button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Brand</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {cars.map((car) => (
                <tr key={car._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{car.brand}</td>
                  <td className="py-3 px-6 text-left">{car.type}</td>
                  <td className="py-3 px-6 text-left">{car.description}</td>
                  <td className="py-3 px-6 text-left">
                    {car.carImage && (
                      <img
                        src={`http://localhost:8000/car/${car.carImage}`}
                        alt={car.brand}
                        className="w-16 h-16 object-cover"
                      />
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button onClick={() => handleUpdate(car._id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-green-500">Update</button>
                    <button onClick={() => handleDelete(car._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarList;
