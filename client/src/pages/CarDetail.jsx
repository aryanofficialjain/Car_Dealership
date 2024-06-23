import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Context } from '../context/Context';

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const {addToCart} = useContext(Context);
  const [cart, setCart] = useState(false);


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

  const handleclick = (cardata) => {
    console.log(cardata)
    setCart(!cart)
    addToCart(cardata); 
  }

  return (
    <div>
      <h2>Car Details</h2>
      <p><strong>Brand:</strong> {car.brand}</p>
      <p><strong>Type:</strong> {car.type}</p>
      <p><strong>Description:</strong> {car.description}</p>
      {car.carImage && <img src={`http://localhost:8000/car/${car.carImage}`} alt={`${car.brand} ${car.type}`} style={{ maxWidth: '200px' }} />}
      <button onClick={() => handleclick(car)}>{cart ? ("Remove") : ("Add")}</button>
    </div>
  );
};

export default CarDetail;
