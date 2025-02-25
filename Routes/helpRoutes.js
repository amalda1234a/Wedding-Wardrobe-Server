const express = require("express");
const router = express.Router();
const helpController = require("../controllers/helpController");
const userAuth = require("../middlewares/userAuth"); // Import authentication middleware

// ✅ Protect this route so only logged-in users can submit messages
router.post("/submit", userAuth, helpController.submitHelpMessage);

// ✅ Admin can fetch all messages
router.get("/messages", userAuth, helpController.getHelpMessages);

module.exports = router;
