const Address = require("../models/addressModel");

// Create a new address
const createAddress = async (req, res) => {
  try {
    const { name, email, address, phone, city, postalCode, country } = req.body;

    // Create a new address entry
    const newAddress = new Address({
      name,
      email,
      address,
      phone,
      city,
      postalCode,
      country,
    });

    // Save the address to the database
    const savedAddress = await newAddress.save();

    res.status(201).json({
      message: "Address submitted successfully",
      address: savedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all addresses
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json({
      message: "Addresses fetched successfully",
      addresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an address by ID
const deleteAddress = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedAddress = await Address.findByIdAndDelete(id);
      if (!deletedAddress) {
        return res.status(404).json({ message: "Address not found" });
      }
      res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  const getAddressCount = async (req, res) => {
    try {
      const count = await Address.countDocuments(); // Count the total number of addresses
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
module.exports = { createAddress, getAddresses, deleteAddress,getAddressCount };
