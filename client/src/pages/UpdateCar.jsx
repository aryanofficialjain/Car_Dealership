import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";

const UpdateCar = () => {
  const { id } = useParams(); // Extract id from URL
  const { token } = useContext(Context);
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("sedan");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // New state for price
  const [carImages, setCarImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await axios.get(`https://car-dealership-4cnd.onrender.com/car/car/${id}`);
        const car = res.data;
        setBrand(car.brand);
        setType(car.type);
        setDescription(car.description);
        setPrice(car.price.toString()); // Assuming price is a number, convert to string
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("brand", brand);
      formData.append("type", type);
      formData.append("description", description);
      formData.append("price", price); // Append price to FormData
      if (carImages) {
        formData.append("carImages", carImages);
      }

      const res = await axios.put(
        `https://car-dealership-4cnd.onrender.com/car/car/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      if (res.status === 200) {
        const updatedCar = res.data.car; // Assuming res.data has updated car details
        setBrand(updatedCar.brand);
        setType(updatedCar.type);
        setDescription(updatedCar.description);
        setPrice(updatedCar.price.toString()); // Update price in state
        navigate("/carlist"); // Navigate after updating state
      }
      // Optionally handle success feedback or redirect
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Error updating car. Please try again.");
    }
  };

  // const handleFileChange = (e) => {
  //   setCarImages([...carImages, ...e.target.files]);
  // };
  

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Update Car Details</h2>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium">Brand:</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
            >
              <option value="suv">SUV</option>
              <option value="supercar">Supercar</option>
              <option value="sedan">Sedan</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Price:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-sm font-medium">Car Image:</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              multiple name="carImages"
              className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
            />
          </div> */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
