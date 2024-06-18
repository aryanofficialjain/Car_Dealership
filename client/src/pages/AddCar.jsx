import React, { useState } from 'react';

const AddCar = () => {
  const [formData, setFormData] = useState({
    engineType: '',
    year: '',
    engine: '', 
    color: '',
    mileage: '',
    images: [],
    description: '',
    brand: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // For simplicity, storing only file names in formData.images
    setFormData({
      ...formData,
      images: files.map(file => file.name)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can add further logic here to handle form submission
  };

  return (
    <div>
      <h2>Add Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Engine Type:
          <select name="engineType" value={formData.engineType} onChange={handleChange}>
            <option value="">Select Engine Type</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="supercar">Supercar</option>
          </select>
        </label>
        <br />
        <label>
          Year:
          <input type="text" name="year" value={formData.year} onChange={handleChange} />
        </label>
        <br />
        <label>
          Engine:
          <input type="number" name="engine" value={formData.engine} onChange={handleChange} />
        </label>
        <br />
        <label>
          Color:
          <input type="text" name="color" value={formData.color} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mileage:
          <input type="text" name="mileage" value={formData.mileage} onChange={handleChange} />
        </label>
        <br />
        <label>
          Images:
          <input type="file" name="images" multiple onChange={handleImageChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Brand:
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
