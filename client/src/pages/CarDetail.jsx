import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/car/car/${id}`); // Adjust port if necessary
        setCar(response.data); // Assuming response.data is the car object
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetail();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Car Details</h2>
      <p><strong>Brand:</strong> {car.brand}</p>
      <p><strong>Type:</strong> {car.type}</p>
      <p><strong>Description:</strong> {car.description}</p>
      {car.carImage && <img src={`http://localhost:8000/car/${car.carImage}`} alt={`${car.brand} ${car.type}`} style={{ maxWidth: '200px' }} />}
    </div>
  );
};

export default CarDetail;
