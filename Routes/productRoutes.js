const express = require("express");
const { addProduct, getAllProducts } = require("../controllers/productController");
const upload = require("../middlewares/upload"); // Middleware for handling file uploads
const router = express.Router();

// Route to add a product (Ensure 'upload.single("image")' is used for file upload)
router.post("/addProduct", upload.single("image"), addProduct);

// Route to get all products
router.get("/allProducts", getAllProducts);

module.exports = router;


// productRouter.post('/addToCart',productController.addToCart);

// productRouter.get('/getCart/:userId', productController.getCart);



// // Remove a product from the cart
// productRouter.delete('/removeFromCart', productController.removeFromCart);

// Clear the cart for a user
// productRouter.delete('/clearCart', productController.clearCart);



// module.exports = productRouter;