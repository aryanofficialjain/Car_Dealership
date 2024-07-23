const express = require("express");
 const app = express();
// Import your router
const apiRouter = require("./routes/PaymentRoute.js");  // Assuming routes.js is in the same directory

// Middleware to parse JSON bodies
app.use(express.json());

// Route Middleware
app.use("/api", apiRouter);

module.exports = {app}

