const { Router } = require("express");

const { payment, success, failed } = require("../controllers/paypalControllers");

const router = Router();

router.post('/payment', payment)
router.get('/success',success )
router.get('/failed', failed)


module.exports = router;
