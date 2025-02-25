const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        console.log("🔴 No token provided.");
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ Ensure user info is stored in req.user
        console.log("🟢 Token verified, User ID:", req.user.id);
        next();
    } catch (error) {
        console.error("🔴 Token verification failed:", error);
        return res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = userAuth;
