const mongoose = require("mongoose");

const dbConnection = (url) => {
  mongoose.connect(url)
  .then(() => console.log("MongoDB Successfully Connected"))
  .catch((err) => console.log("Error while connecting to MongoDB:", err));
}

module.exports = dbConnection;
