const {Router} = require("express")
const carControllers = require("../controllers/carControllers.js")

const router = Router();
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

const upload = multer({ storage: storage });

router.post("/addcar",upload.single("carImage"), carControllers.AddCar);
router.get("/allcars", carControllers.AllCar);
router.get("/car/:id", carControllers.CarDetails);
router.put("/car/:id", carControllers.UpdateCar);
router.delete("/car/:id", carControllers.DeleteCar);


module.exports = router;
