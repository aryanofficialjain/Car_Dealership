require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const carRoutes = require("./routes/carRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const dbConnection = require("./database/db.js");

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
const allowedOrigins = ['http://localhost:5173', 'https://car-dealership-frontend-indol.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Allow all HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
}));

// app.use(express.static(path.resolve("./public")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


dbConnection(process.env.DB_URL);

// Routes
app.get("/", (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";

  res.send(`
    <h1>Server Status</h1>
    <p>Server is running on port ${PORT}</p>
    <p>MongoDB Status: ${mongoStatus}</p>
    <p>mongo db url : ${process.env.DB_URL}</p>
  `);
});

app.use("/user", userRoutes);
app.use("/car", carRoutes);
app.use("/cart", cartRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
