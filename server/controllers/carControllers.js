const Car = require("../models/Car.js");

const AddCar = async (req, res) => {
  // Ensure that required fields are present in req.body
  const { brand, type, description } = req.body;
  if (!brand || !type || !description) {
    return res.status(400).json({ message: "Brand, type, and description are required" });
  }

  try {

    const car = await Car.create({
      brand,
      type,
      description,
      carImage: req.file ? req.file.filename : null, // Handle if no file is uploaded
    });

    if (!car) {
      return res.status(404).json({ message: "Unable to add car" });
    }

    return res.status(201).json({ message: "Car added successfully", car });
    // Use 201 status for successful creation (according to RESTful conventions)
  } catch (error) {
    console.error("Error adding car:", error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error while adding the car" });
  }
};


const AllCar = async (req, res) => {
  try {
    const cars = await Car.find({});

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    return res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while fetching cars" });
  }
};

const CarDetails = async (req, res) => {
  const id = req.params.id;

  try {
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json(car);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while fetching car details" });
  }
};



const UpdateCar = async (req, res) => {
  const { id } = req.params;
  const { brand, type, description } = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(id, {
      brand,
      type,
      description,
    }, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    console.error("Error updating car:", error.message);
    return res.status(500).json({ message: "Error while updating the car" });
  }
};

const DeleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ message: "Car deleted successfully", car: deletedCar });
  } catch (error) {
    console.error("Error deleting car:", error.message);
    return res.status(500).json({ message: "Error while deleting the car" });
  }
};



module.exports = { AddCar, AllCar , CarDetails, UpdateCar, DeleteCar};
