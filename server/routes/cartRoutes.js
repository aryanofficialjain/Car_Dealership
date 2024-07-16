const { Router } = require("express");
const cartControllers = require("../controllers/cartControllers");
const router = Router();

router.post("/additem", cartControllers.AddItem);
router.get("/getitem", cartControllers.GetItem);
router.delete("/deleteitem", cartControllers.DeleteItem);
router.post("/buy", cartControllers.BuyCar);
router.get("/buy", cartControllers.GetUserAndCar);
router.delete("/buy", cartControllers.DeleteUserAndCar);
router.post("/address", cartControllers.AddAddress);

module.exports = router;
