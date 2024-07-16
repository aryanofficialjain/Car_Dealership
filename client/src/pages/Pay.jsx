import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const { cartItems, token, setBuyerToken, buyCarId } = useContext(Context);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  const handleBuy = async () => {
    try {
      // Check if cartItems has any items
      const carIds =
        cartItems.length > 0
          ? cartItems.map((item) => item._id.toString())
          : Array.isArray(buyCarId) ? buyCarId : []; // Ensure buyCarId is an array

      console.log("Car IDs:", carIds); // Debugging statement

      // Make the POST request to your backend
      const response = await axios.post(
        "http://localhost:8000/cart/buy",
        { ids: carIds, paymentMethod }, // Include payment method in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Order successfully accepted");
        setBuyerToken(token);
        navigate("/review");
        // You may want to refresh cart items after successful purchase
        // fetchCartItems(); // Make sure fetchCartItems function is available
      } else {
        console.error("Failed to purchase cars:", response.data);
        alert("Failed to purchase cars. Please try again later.");
      }
    } catch (error) {
      console.error("Error buying cars:", error);
      alert("Failed to purchase cars. Please try again later.");
    }
  };

  const handleChangePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Select Payment Method:
        </label>
        <div className="flex items-center">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={handleChangePaymentMethod}
            className="mr-2"
          />
          <label htmlFor="cod" className="mr-4">
            Cash on Delivery (COD)
          </label>
          <input
            type="radio"
            id="upi"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={handleChangePaymentMethod}
            className="mr-2"
          />
          <label htmlFor="upi">UPI</label>
        </div>
      </div>
      <button className="bg-red-500 text-white p-3" onClick={handleBuy}>
        Buy it
      </button>
    </div>
  );
};

export default Pay;
