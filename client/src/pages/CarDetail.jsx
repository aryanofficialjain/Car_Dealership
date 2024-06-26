import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";
import Navbar from "../components/Navbar";

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const { token, cartItems, setCartItems } = useContext(Context);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/car/car/${id}`);
        setCar(response.data);
        // Check if car is already in cart
        const foundInCart = cartItems.some((item) => item._id === response.data._id);
        setIsInCart(foundInCart);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetail();
  }, [id, cartItems]);

  if (!car) {
    return <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">Loading...</div>;
  }

  const handleAddToCart = async (carId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/cart/additem",
        { carid: carId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(response.data);
      setIsInCart(true); // Update local state to reflect addition to cart
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveFromCart = async (carId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/cart/deleteitem`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { itemId: carId },
      });
      setCartItems(response.data);
      setIsInCart(false); // Update local state to reflect removal from cart
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Car Details</h2>
        <div className="bg-black rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center mb-4">
            {car.carImage && (
              <img src={`http://localhost:8000/car/${car.carImage}`} alt={`${car.brand} ${car.type}`} className="max-w-full h-auto rounded-lg" />
            )}
          </div>
          <div>
            <p className="text-xl font-semibold mb-2">{car.brand}</p>
            <p className="text-gray-300 mb-2">{car.type}</p>
            <p className="text-gray-400 mb-4">{car.description}</p>
            {isInCart ? (
              <button
                onClick={() => handleRemoveFromCart(car._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={() => handleAddToCart(car._id)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
