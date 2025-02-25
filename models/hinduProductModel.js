const mongoose = require("mongoose");

const hinduProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }, 
        category: { 
            type: String, 
            enum: ["bridalWear", "jewelry"], 
            required: true 
        }, 
        stock: { type: Number, required: true, default: 0 }, 
    },
    { timestamps: true }
);

const HinduProduct = mongoose.model("HinduProduct", hinduProductSchema);
module.exports = HinduProduct;
