const express = require("express");
const router = express.Router();
const hinduProductController = require("../controllers/hinduProductController");
const upload = require("../middlewares/upload"); // ✅ Ensure correct path

// ✅ CRUD Routes for Hindu Products
router.post("/add", upload.single("image"), hinduProductController.addHinduProduct);
router.put("/:id", upload.single("image"), hinduProductController.updateHinduProduct);
router.get("/", hinduProductController.getAllHinduProducts); // Get all products

router.get("/category/:category", hinduProductController.getHinduProductsByCategory); 
router.get("/:id", hinduProductController.getHinduProductById);

router.delete("/:id", hinduProductController.deleteHinduProduct);





module.exports = router;
