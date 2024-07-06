import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cartItems = [], setCartItems, token } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Calculate total price whenever cartItems change
    calculateTotalPrice();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/cart/getitem", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]); // Set cartItems to an empty array on error
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/cart/deleteitem`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { itemId: id },
      });
      // Refetch cart items after successful removal
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item) => {
        total += item.price; // Assuming item.price is the price of each item
      });
    }
    setTotalPrice(total);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <p className="text-center">Your Cart is Empty</p>
        ) : (
          <>
            <h2 className="text-center mb-4 text-2xl font-bold">Your Cart</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="bg-black rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={`http://localhost:8000/car/${item.carImages[0]}`}
                    alt={`${item.brand} ${item.type}`}
                    className="w-full"
                  />
                  <div className="p-4">
                    <p className="text-lg font-bold">{item.brand} - {item.type}</p>
                    <p className="text-gray-400">Price: ${item.price}</p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <p className="text-xl font-bold">Total Price: ${totalPrice}</p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-green-500">
                BUY
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
