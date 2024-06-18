const Car = require("../models/Car.js");

const AllCars = async (req, res) => {
  const { token } = req.headers.authorization;

  try {
    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddCar = async (req, res) => {
  const { token } = req.headers.authorization;
  const { engine, type, brand, year, color, price, mileage, description } = req.body;

  if (token) {
    try {
      const images = req.files.map((file) => file.filename);
      const car = await Car.create({
        engine,
        type,
        brand,
        year,
        color,
        price,
        mileage,
        description,
        images, 
      });

      if (!car) {
        return res.status(404).json({ message: "Failed to add car" });
      }

      return res.status(200).json({ message: "Car added successfully", car });
    } catch (error) {
      console.error("Error adding car:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};


const EditCar = async (req, res) => {
  const { token } = req.headers.authorization;
  const { id } = req.params;
  const { engine, type, brand, year, color, price, mileage, description } = req.body;

  const role = token.role;

  try {
    if (token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      {
        engine,
        type,
        brand,
        year,
        color,
        price,
        mileage,
        description,
      },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    console.error("Error editing car:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const DeleteCar = async (req, res) => {
  const { token } = req.headers.authorization; // Corrected spelling of 'authorization'
  const { id } = req.params; // Extract car ID from request parameters

  try {
    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res
      .status(200)
      .json({ message: "Car deleted successfully", car: deletedCar });
  } catch (error) {
    console.error("Error deleting car:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const CarDetails = async (req, res) => {
  const { id } = req.params; 

  try {
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { AllCars, AddCar, EditCar, DeleteCar, CarDetails };
