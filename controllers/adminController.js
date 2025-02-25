const jwt = require("jsonwebtoken");
require("dotenv").config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// ✅ Secure Admin Login
async function adminLogin(req, res) {
    try {
        const { email, password } = req.body;

        console.log("Admin Login Attempt:", email); // ✅ Debugging

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Invalid admin credentials" });
        }

        // ✅ Generate token with admin role
        const token = jwt.sign(
            { role: "admin", isAdmin: true }, // ✅ Include `isAdmin` flag
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.status(200).json({ 
            message: "Login successful", 
            token, 
            isAdmin: true // ✅ Send isAdmin for frontend usage
        });

    } catch (error) {
        console.error("Admin login failed:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
}

module.exports = { adminLogin };
