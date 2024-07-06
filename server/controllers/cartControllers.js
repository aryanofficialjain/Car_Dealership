const Car = require("../models/Car.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const AddItem = async (req, res) => {
  try {
    const { carid } = req.body;
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing or invalid token" });
    }

    const authToken = token.split(" ")[1];

    const verifyToken = jwt.verify(authToken, process.env.SECRET_KEY);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Token is not verified" });
    }

    const { id, role } = verifyToken;

    if (role !== "user") {
      return res.status(404).json("Your are admin not able to get cart items");
    }

    const car = await Car.findById(carid);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the car already exists in the user's cart
    const alreadyInCart = user.cart.some((item) => item.equals(car._id));
    if (alreadyInCart) {
      return res.status(400).json({ error: "Car already exists in the cart" });
    }

    // Add car to user's cart
    user.cart.push(car);
    await user.save();

    console.log(user.cart); // Log user's updated cart

    return res
      .status(200)
      .json({ message: "Car added successfully", cart: user.cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetItem = async (req, res) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Bearer token missing or invalid" });
    }

    const accessToken = authHeader.split("Bearer ")[1];

    // Verify and decode the token
    const verifyToken = jwt.verify(accessToken, process.env.SECRET_KEY);

    if (!verifyToken) {
      return res.status(401).json({ error: "Token is not verified" });
    }

    const { id, role } = verifyToken;

    if (role !== "user") {
      return res.status(404).json("Your are admin not able to get cart items");
    }

    // Fetch user and populate 'cart' field
    const user = await User.findById(id).populate("cart");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user's cart items
    return res.status(200).json(user.cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Bearer token missing or invalid" });
    }

    const accessToken = authHeader.split("Bearer ")[1];
    console.log(accessToken);
    const verifyToken = jwt.verify(accessToken, process.env.SECRET_KEY);
    if (!verifyToken) {
      return res.status(401).json({ error: "Token is not verified" });
    }
    const { id, role } = verifyToken;

    if (role !== "user") {
      return res.status(404).json("Your are admin not able to get cart items");
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.cart = user.cart.filter((item) => item.toString() !== itemId); // Assuming itemId is a string
    await user.save();

    return res
      .status(200)
      .json({ message: "Item deleted successfully", cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// purchase controllers

const BuyCar = async (req, res) => {
  try {
    const { ids } = req.body; // Array of car IDs to purchase

    // Ensure ids is an array and not empty
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid car IDs provided" });
    }

    // Find cars by their IDs
    const cars = await Car.find({ _id: { $in: ids } });
    if (cars.length !== ids.length) {
      return res.status(404).json({ error: "One or more cars not found" });
    }

    // Verify the token and find the authenticated user
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find user by ID from decoded token
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add purchased cars to user's purchasedCars array
    user.purchasedCars.push(...cars.map((car) => car._id));
    await user.save();

    // Remove purchased cars from user's cart
    user.cart = user.cart.filter(
      (cartCarId) => !ids.includes(cartCarId.toString())
    );
    await user.save();

    return res
      .status(200)
      .json({ message: "Cars purchased successfully", user });
  } catch (error) {
    console.error("Error purchasing cars:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetUserAndCar = async (req, res) => {};

const DeleteUserAndCar = () => {};

const GetUserAndHisCar = () => {};

module.exports = {
  AddItem,
  GetItem,
  DeleteItem,
  BuyCar,
  DeleteUserAndCar,
  GetUserAndCar,
  GetUserAndHisCar,
};
