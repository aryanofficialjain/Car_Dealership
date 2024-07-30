const Car = require("../models/Car.js");
const jwt = require("jsonwebtoken");
const fs = require("fs")
const path = require("path");

const AddCar = async (req, res) => {
  const { brand, type, description, price } = req.body;
  if (!brand || !type || !description || !price) {
    return res
      .status(400)
      .json({ message: "Brand, type, and description are required" });
  }

  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
  }

  const authToken = token.split(" ")[1];

  const verifyToken = jwt.verify(authToken, process.env.SECRET_KEY);

  const { role } = verifyToken;

  if (role !== "admin") {
    return res.status(404).json("Your are an Admin");
  }
  const carImages = req.files.map((file) => file.filename);

  try {
    const car = await Car.create({
      brand,
      type,
      description,
      price,
      carImages: carImages,
    });

    if (!car) {
      return res.status(404).json({ message: "Unable to add car" });
    }

    return res.status(201).json({ message: "Car added successfully", car });
  } catch (error) {
    console.error("Error adding car:", error.message);
    if (error.name === "ValidationError") {
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
    return res
      .status(500)
      .json({ message: "Error while fetching car details" });
  }
};

const UpdateCar = async (req, res) => {
  const { id } = req.params;
  const { brand, type, description, price } = req.body;

  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
  }

  const authToken = token.split(" ")[1];

  const verifyToken = jwt.verify(authToken, process.env.SECRET_KEY);

  const { role } = verifyToken;

  if (role !== "admin") {
    return res.status(404).json("Your are an Admin");
  }

  const carImages = req.files?.map((file) => file.filename);

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      {
        brand,
        type,
        description,
        price,
        carImages: carImages, 
      },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res
      .status(200)
      .json({ message: "Car updated successfully", car: updatedCar });
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

    return res
      .status(200)
      .json({ message: "Car deleted successfully", car: deletedCar });
  } catch (error) {
    console.error("Error deleting car:", error.message);
    return res.status(500).json({ message: "Error while deleting the car" });
  }
};

const Review = async (req, res) => {
  const { comment, rating, id } = req.body; // Destructure id from req.body directly
  console.log(req.body);

  try {
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Extract token from Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Decode the token to get the payload (which should include username)
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual JWT secret

    const username = decodedToken.id;

    // Prepare the review object
    const newReview = {
      rating: rating,
      comment: comment,
      reviewedBy: username,
    };

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      newReview.images = req.files.map(file => file.path); // Assuming files are stored with multer and file.path contains the path to the uploaded image
    }

    // Push the review into the car's reviews array and save
    car.reviews.push(newReview);
    await car.save();

    res.status(200).json({ message: "Review added successfully", review: newReview });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ error: "Server error" });
  }
};


const GetReview = async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.findById(carId).populate({
      path: 'reviews.reviewedBy', // Populate the reviewedBy field with user details
      select: 'username email profileImage', // Specify fields to include from User model
    });

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json(car.reviews); // Return reviews associated with the car
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

module.exports = { AddCar, AllCar, CarDetails, UpdateCar, DeleteCar, Review, GetReview };
