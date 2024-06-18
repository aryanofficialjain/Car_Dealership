import React from "react";
import { Link } from "react-router-dom";

const CarContainer = ({ cars }) => {
  return (
    <div className="car-container">
      {cars.map((car) => (
        <div key={car.id} className="car-card">
          <Link to={`/car/${car.id}`}>
            <h3>{car.brand}</h3>
            <img src={`http://localhost:8000/${car.images[0]}`} alt="" />
            <p>Description: {car.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CarContainer;
