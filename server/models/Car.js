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
  carImages: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  price: {
    type: Number,
  },
  buyers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      images: [
        {
          type: String, // Assuming storing URLs or file paths to images
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Car = model("Car", carSchema);
module.exports = Car;
