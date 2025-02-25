const express = require("express");
const router = express.Router();
const christianProductController = require("../controllers/christianProductController");
const upload = require("../middlewares/upload"); // ✅ Ensure correct path

// ✅ CRUD Routes for Christian Products
router.post("/add", upload.single("image"), christianProductController.addChristianProduct);
router.put("/:id", upload.single("image"), christianProductController.updateChristianProduct);
router.get("/", christianProductController.getAllChristianProducts); // Get all products

router.get("/category/:category", christianProductController.getChristianProductsByCategory); // ✅ Move this BEFORE `/:id`
router.get("/:id", christianProductController.getChristianProductById);
 // ✅ Get by ID (should come after category)
router.delete("/:id", christianProductController.deleteChristianProduct);

module.exports = router;
