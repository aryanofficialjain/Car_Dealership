require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import cors middleware
const dbConnection = require("./database/db");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const path = require("path")
const carRoutes = require("./routes/carRoutes.js")
const cartRoutes = require("./routes/cartRoutes.js")



const app = express();
app.use(express.static(path.resolve("./public")));

dbConnection(process.env.DB_URL);

// Middleware
const allowedOrigins = ['https://car-dealership-server.vercel.app/'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req,res) => {
    res.send("Hello world server is running 🤣")
})
app.use("/user", userRoutes);
app.use("/car", carRoutes);
app.use("/cart", cartRoutes);



app.listen(PORT, () => console.log("Server is running on port", PORT));
