const { model, Schema } = require("mongoose");

const carSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["suv", "supercar", "sedan"],
    default: "sedan",
  },
  price: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  carImages: {
    type: [String], 
  },
  description: {
    type: String,
  },
});

const Car = model("Car", carSchema);
module.exports = Car;
