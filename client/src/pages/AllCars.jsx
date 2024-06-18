import React, { useState, useEffect } from 'react';
import CarContainer from '../components/CarContainer';
import Navbar from '../components/Navbar';


const AllCars = () => {
  const [cars, setCars] = useState([]);
  

  return (
    <div>
        <Navbar/>
      <h2>All Cars</h2>
      <CarContainer cars={cars}  />
    </div>
  );
};

export default AllCars;
