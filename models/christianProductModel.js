const mongoose = require("mongoose");

const christianProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }, // Store only filename
        category: { 
            type: String, 
            enum: ["bridalWear", "jewelry"], 
            required: true 
        } ,// ✅ Allows selection between two categories
        stock: { type: Number, required: true, default: 0 }, // Add this line for stock
    },
    { timestamps: true }
);

const ChristianProduct = mongoose.model("ChristianProduct", christianProductSchema);
module.exports = ChristianProduct;
