const {Router} = require("express")
const cartControllers = require("../controllers/cartControllers");
const router = Router();

router.post("/additem", cartControllers.AddItem);
router.get("/getitem", cartControllers.GetItem);
router.delete("/deleteitem", cartControllers.DeleteItem);


module.exports = router;
