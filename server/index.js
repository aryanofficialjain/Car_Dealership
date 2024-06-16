require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import cors middleware
const dbConnection = require("./database/db");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const path = require("path")


const app = express();
app.use(express.static(path.resolve("./public")));

dbConnection(process.env.DB_URL);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/user", userRoutes);

app.listen(PORT, () => console.log("Server is running on port", PORT));
