const MuslimProduct = require("../models/muslimProductModel");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// ✅ Add a new Muslim product with image upload and stock
exports.addMuslimProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const trimmedName = name?.trim();
        const trimmedDescription = description?.trim();
        const trimmedCategory = category?.trim();
        const image = req.file ? req.file.filename : ""; // Store filename only

        if (!trimmedName || !trimmedDescription || !price || !trimmedCategory || !stock) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!["bridalWear", "jewelry"].includes(trimmedCategory)) {
            return res.status(400).json({ message: "Invalid category" });
        }

        const newProduct = new MuslimProduct({
            name: trimmedName,
            description: trimmedDescription,
            price,
            image,
            category: trimmedCategory,
            stock,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

// ✅ Update a Muslim product with image upload and stock
exports.updateMuslimProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const trimmedName = name?.trim();
        const trimmedDescription = description?.trim();
        const trimmedCategory = category?.trim();

        if (!trimmedName || !trimmedDescription || !price || !trimmedCategory || !stock) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!["bridalWear", "jewelry"].includes(trimmedCategory)) {
            return res.status(400).json({ message: "Invalid category" });
        }

        const product = await MuslimProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let updateData = {
            name: trimmedName,
            description: trimmedDescription,
            price,
            category: trimmedCategory,
            stock, // Update stock
        };

        // Delete old image if a new one is uploaded
        if (req.file) {
            if (product.image) {
                const oldImagePath = path.join(__dirname, "../uploads", product.image);
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
            updateData.image = req.file.filename;
        }

        const updatedProduct = await MuslimProduct.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// ✅ Get all Muslim products
exports.getAllMuslimProducts = async (req, res) => {
    try {
        const products = await MuslimProduct.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// ✅ Get all Muslim products by category (bridalWear or jewelry)
exports.getMuslimProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const trimmedCategory = category?.trim();

        if (!["bridalWear", "jewelry"].includes(trimmedCategory)) {
            return res.status(400).json({ message: "Invalid category" });
        }

        const products = await MuslimProduct.find({ category: trimmedCategory });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// ✅ Get a single Muslim product by ID
exports.getMuslimProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await MuslimProduct.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${product.image}`;
        const relatedProducts = await MuslimProduct.find({ 
            category: product.category, 
            _id: { $ne: product._id } 
        }).limit(4);

        res.status(200).json({
            product: { ...product._doc, image: imageUrl },
            relatedProducts,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching product details", error: error.message });
    }
};

// ✅ Delete a Muslim product (with image deletion)
exports.deleteMuslimProduct = async (req, res) => {
    try {
        const product = await MuslimProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Delete image file from server
        if (product.image) {
            const imagePath = path.join(__dirname, "../uploads", product.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await MuslimProduct.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};
