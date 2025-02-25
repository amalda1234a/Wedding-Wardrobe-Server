const express = require("express");
const router = express.Router();
const muslimProductController = require("../controllers/muslimProductController");
const upload = require("../middlewares/upload"); // ✅ Ensure correct path

// ✅ CRUD Routes for Muslim Products
router.post("/add", upload.single("image"), muslimProductController.addMuslimProduct);
router.put("/:id", upload.single("image"), muslimProductController.updateMuslimProduct);
router.get("/", muslimProductController.getAllMuslimProducts); // Get all products
router.delete("/:id", muslimProductController.deleteMuslimProduct);


router.get("/category/:category", muslimProductController.getMuslimProductsByCategory); // ✅ First
router.get("/:id", muslimProductController.getMuslimProductById); // ✅ After




module.exports = router;
