import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const CarForm = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("sedan");
  const [description, setDescription] = useState("");
  const [carImages, setcarImage] = useState([]);
  const [price, setPrice] = useState("");
  const { token } = useContext(Context);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("brand", brand);
      formData.append("type", type);
      formData.append("description", description);
      formData.append("price", price);

      // Append each image file to formData
      for (let i = 0; i < carImages.length; i++) {
        formData.append("carImages", carImages[i]);
      }


      const res = await axios.post(
        `${import.meta.env.VITE_DOMAIN_URL}/car/addcar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      if (res.status === 201) {
        navigate("/carlist");
      }
      setBrand("");
      setType("sedan");
      setDescription("");
      setcarImage([]);
      setPrice("");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Error adding car. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setcarImage(files);
  };


  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Add a New Car</h2>
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
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Images:</label>
            <input
              type="file" name="carImages"
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="block w-full mt-1 p-2 border rounded-lg bg-gray-800 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          
            Adfd Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
