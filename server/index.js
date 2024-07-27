require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/db");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const carRoutes = require("./routes/carRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

const app = express();

app.use(cors({
  origin: "https://car-dealership-frontend-eta.vercel.app",
  credentials: true 
}))
// Serve static files
app.use(express.static(path.resolve("./public")));

// Connect to the database
dbConnection(process.env.DB_URL);

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routesa
app.get("/", (req, res) => {
  res.send("Hello world server is running 🤣");
});
app.use("/user", userRoutes);
app.use("/car", carRoutes);
app.use("/cart", cartRoutes);

// Start the server
app.listen(PORT, () => console.log("Server is running on port", PORT));
