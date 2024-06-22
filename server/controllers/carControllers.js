// controllers/carControllers.js
const Car = require("../models/Car.js");

const AddCar = async (req, res) => {
  console.log(req.body);
  try {
    const { brand, type, description } = req.body;

    const car = await Car.create({
      brand,
      type,
      description,
      carImage: req.file.filename, // Assuming this is the filename of the uploaded image
    });

    if (!car) {
      return res.status(404).json({ message: "Unable to add car" });
    }

    return res.status(200).json({ message: "Car added successfully", car });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error while adding the car" });
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



module.exports = { AddCar, AllCar , CarDetails};
