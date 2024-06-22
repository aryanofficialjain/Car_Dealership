// src/components/AllCar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllCar = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/car/allcars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleclick = (id) => {
    navigate(`/car/car/${id}`)
  }

  return (
    <div>
      <h2>All Cars</h2>
      <ul>
        {cars.map(car => (
          <li key={car._id} onClick={() => handleclick(car._id)}>
            <strong>{car.brand}</strong> - {car.type}
            {car.carImage && <img src={`http://localhost:8000/car/${car.carImage}`} alt={`${car.brand} ${car.type}`} style={{ maxWidth: '200px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCar;
