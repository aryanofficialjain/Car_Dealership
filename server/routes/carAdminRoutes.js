// In routes.js

const { Router } = require("express");
const carControllers = require("../controllers/carControllers.js");
const authToken = require("../middleware/authToken.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/car"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Adjust as needed
}).array("images", 4); // 'images' is the field name for multiple files, 5 is the maximum number of files allowed

const router = Router();

router.get("/allcars", carControllers.AllCars);
router.post("/addcar", upload, carControllers.AddCar);
router.put("/editcar/:id", carControllers.EditCar);
router.delete("/deletecar/:id", carControllers.DeleteCar);
router.get("/car/:id", carControllers.CarDetails)

module.exports = router;
