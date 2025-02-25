const express = require("express");
const router = express.Router();
const { createAddress, getAddresses, deleteAddress,getAddressCount } = require("../controllers/addressController");

// Route to create a new address
router.post("/add", createAddress);

// Route to get all addresses
router.get("/get", getAddresses);

// Route to delete an address by ID
router.delete('/delete/:id', deleteAddress);

router.get("/count", getAddressCount); // This is correct, it uses the getAddressCount function

module.exports = router;
