// components/CarForm.jsx
import React, { useContext, useState } from "react";
import axios from "axios";

const CarForm = () => {
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("sedan");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("brand", brand);
      formData.append("type", type);
      formData.append("description", description);
      formData.append("carImage", image);

      const res = await axios.post(
        "http://localhost:8000/car/addcar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      setBrand("");
      setType("sedan");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Error adding car. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2>Add a New Car</h2>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <label>
          Brand:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="suv">SUV</option>
            <option value="supercar">Supercar</option>
            <option value="sedan">Sedan</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Car Image:
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </label>
        <br />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default CarForm;
