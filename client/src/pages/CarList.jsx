import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Context from '../context/Context';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(Context);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('https://car-dealership-cs3o.onrender.com/car/admincar', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCars(res.data.cars);  // Corrected line
        console.log(res.data); 
        console.log(res.data.cars); 
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [token]);  // Updated dependency

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://car-dealership-cs3o.onrender.com/car/car/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCars(cars.filter(car => car._id !== id));
      console.log(`Deleted car with id ${id}`);
    } catch (error) {
      console.log('Error deleting car:', error.message);
    }
  };

  const handleAdd = () => {
    navigate("/addcar");
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-center mb-4 text-2xl font-bold">Car List</h2>
        <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 block w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500">Add</button>
        <div className="overflow-x-auto">
          <div className="-mx-4 sm:mx-0">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200 text-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Brand
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cars.length > 0 ? (
                        cars.map((car) => (
                          <tr key={car._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {car.carImages && car.carImages.length > 0 && (
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src={`https://car-dealership-cs3o.onrender.com/${car.carImages[0]}`}
                                      alt={car.brand}
                                    />
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{car.brand}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{car.type}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{car.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${car.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {car.carImages && car.carImages.length > 0 && (
                                <img
                                  className="h-16 w-16 object-cover"
                                  src={`https://car-dealership-cs3o.onrender.com/${car.carImages[0]}`}
                                  alt={car.brand}
                                />
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button onClick={() => handleDelete(car._id)} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 text-center">
                            No cars available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarList;