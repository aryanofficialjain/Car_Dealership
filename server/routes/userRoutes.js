const { Router } = require("express");
const userControllers = require("../controllers/userControllers.js");
const router = Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/login", userControllers.loginUser);
router.post(
  "/signup",
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
router.post("/address", userControllers.AddAddress);
router.get("/address", userControllers.GetAddress);
router.put("/address", userControllers.UpdateAddress);
router.delete("/address", userControllers.DeleteAddress);


module.exports = router;
