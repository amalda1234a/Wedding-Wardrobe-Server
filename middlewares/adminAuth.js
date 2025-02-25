const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    console.log("AdminAuth Middleware: Received Token:", token); // ✅ Debug Log

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Ensure `isAdmin` is properly checked
        if (!decoded.isAdmin) { 
            return res.status(403).json({ message: "Forbidden. Admin access only." });
        }

        req.user = decoded; // Attach user data to request
        next(); // Proceed to next middleware
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = adminAuth;
