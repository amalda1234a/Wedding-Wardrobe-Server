const express = require("express");
const userAuth = require("../middlewares/userAuth"); 
const { 
  addToCart, 
  getCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity 
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add",userAuth, addToCart);
router.get("/:userId",userAuth, getCart);
router.post("/remove", userAuth,removeFromCart);
router.post("/increment", incrementQuantity);
router.post("/decrement", decrementQuantity);

module.exports = router;
