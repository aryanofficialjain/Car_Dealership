require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const carRoutes = require("./routes/carRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to the database
const dbConnection = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

dbConnection(process.env.DB_URL);

// Routes
app.get("/", (req, res) => {
  const serverPort = process.env.PORT || 3000;
  const mongoStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";

  res.send(`
    <h1>Server Status</h1>
    <p>Server is running on port ${serverPort}</p>
    <p>MongoDB Status: ${mongoStatus}</p>
  `);
});

app.use("/user", userRoutes);
app.use("/car", carRoutes);
app.use("/cart", cartRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
