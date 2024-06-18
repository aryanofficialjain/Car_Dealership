import React, { useState, useEffect } from "react";

const CarDetails = ({ match }) => {
  const [car, setCar] = useState(null);

  
  return (
    <div>
      <h2>{car.brand}</h2>
      <img src={`http://localhost:8000/${car.images[0]}`} alt="" />
      <p>Description: {car.description}</p>
      <p>Year: {car.year}</p>
      <p>Engine Type: {car.engineType}</p>
      <p>Color: {car.color}</p>
      <p>Mileage: {car.mileage}</p>
    </div>
  );
};

export default CarDetails;
