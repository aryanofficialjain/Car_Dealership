const { Router } = require("express");
const { checkout } = require("../Controller/PaymentController");

const router = Router();

// Define your routes here
router.route("/checkout").post(checkout);


module.exports = router;
