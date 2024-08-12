const {Router} = require("express");
const router = Router();
const botControllers = require("../controllers/botControllers.js");

router.post('/question',botControllers.chatBot);


module.exports = router;
