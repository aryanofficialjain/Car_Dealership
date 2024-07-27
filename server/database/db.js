const mongoose = require("mongoose");

const dbConnection = async (url) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Successfully Connected");
  } catch (err) {
    console.error("Error while connecting to MongoDB:", err);
  }
};

module.exports = dbConnection;
