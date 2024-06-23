const { model, Schema } = require("mongoose");

const carSchema = new Schema({
  brand: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["suv", "supercar", "sedan"],
    default: "sedan",
  },
  carImage: {
    type: String,
  },
  description: {
    type: String,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const Car = model("Car", carSchema);
module.exports = Car;
