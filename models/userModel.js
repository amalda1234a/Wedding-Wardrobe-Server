const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    
    isBlocked: {
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model('User', usersSchema);
