const Car = require("../models/Car.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken")




const AddItem = async (req, res) => {
  try {
    const carid = req.body;
    const { token } = req.headers.authoriztion;

    const verifytoken = jwt.verify(authToken, process.env.SECRET_KEY);
    const { id } = verifytoken;

    if(!verifytoken){
        return res.status(404).json("Token is not verfified")
    }

    const car = await Car.findById(carid);

    if (!car) {
      return res.status(404).json("Car is unavaiable");
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("Cannot find User");
    }

    user.cart.push(car);
    await user.save();

    return res.status(200).json("Car is added succesfully", user.cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};


const GetItem = async (req, res) => {
    try {
      const { token } = req.headers.authorization;
  
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const { id } = verifyToken;
  
      if (!verifyToken) {
        return res.status(404).json("Token is not verified");
      }
  
      const user = await User.findById(id).populate('cart'); 
  
      if (!user) {
        return res.status(404).json("User not found");
      }
  
      return res.status(200).json(user.cart);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal Server Error");
    }
  };
  

const DeleteItem = async (req, res) => {
    try {
      const { itemId } = req.body;
      const { token } = req.headers.authorization;
  
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const { id } = verifyToken;
  
      if (!verifyToken) {
        return res.status(404).json("Token is not verified");
      }
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json("User not found");
      }
  
      user.cart = user.cart.filter(item => item.toString() !== itemId); // Assuming itemId is a string
  
      await user.save();
  
      return res.status(200).json("Item deleted successfully", user.cart);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal Server Error");
    }
  };
  

module.exports = { AddItem, GetItem, DeleteItem };
