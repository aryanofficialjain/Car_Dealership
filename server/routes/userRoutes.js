const { Router } = require("express");
const userControllers = require("../controllers/userControllers.js");
const router = Router();
const multer = require("multer");
const path = require("path");
const rateLimit = require("express-rate-limit");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

// Define a rate limit for login requests
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many login attempts from this IP, please try again later.",
});

// Define a rate limit for signup requests
const signupRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many signup attempts from this IP, please try again later.",
});

const upload = multer({ storage: storage });

router.post("/login", loginRateLimiter, userControllers.loginUser);
router.post(
  "/signup",
  signupRateLimiter,
  upload.single("profileImage"),
  userControllers.signupUser
);
router.put(
  "/update",
  upload.single("profileImage"),
  userControllers.updateUser
);
router.get("/profile", userControllers.profileUser);
router.delete("/delete", userControllers.deleteUser);
router.post("/username/:username", userControllers.verifyUser);
router.post("/address", userControllers.AddAddress);
router.get("/address", userControllers.GetAddress);
router.put("/address", userControllers.UpdateAddress);
router.delete("/address", userControllers.DeleteAddress);

module.exports = router;
