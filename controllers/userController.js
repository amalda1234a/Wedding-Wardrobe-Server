const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded; // Attach the decoded user info to the request
        next();
    });
};

// ✅ Register a new user
async function user(req, res) {
    try {
        const { uname, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name: uname, email, password: hashedPassword });

        // Save user to database
        const userData = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: userData._id, email: userData.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            token, 
            userId: userData._id,  
            username: userData.name,
            message: "Account created successfully!" 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Signup failed", error: error.message });
    }
}

// ✅ Login
async function login(req, res) {
    try {
        console.log("Login attempt received");
        const { email, password } = req.body;

        // Find the user by email
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // 🚨 Prevent blocked users from logging in
        if (userData.isBlocked) {
            return res.status(403).json({ message: "Your account is blocked. Contact support." });
        }

        // Check if the password matches
        const validPass = await bcrypt.compare(password, userData.password);
        if (!validPass) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: userData._id, email: userData.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ 
            message: "Login successful", 
            token, 
            userId: userData._id,  
            username: userData.name 
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Login failed", error: error.message });
    }
}

// ✅ Get all users (Admin only)
async function getAllUsers(req, res) {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
}

// ✅ Toggle block/unblock user (Admin only)
async function toggleBlockUser(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.status(200).json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully` });
    } catch (error) {
        res.status(500).json({ message: "Failed to update user status", error: error.message });
    }
}

// ✅ Home route (protected)
async function home(req, res) {
    console.log('Home route accessed');
    res.json({ data: "products", user: req.user });
}
// ✅ Get the count of all users (Admin only)
async function getUserCount(req, res) {
    try {
        const userCount = await User.countDocuments(); // Count total users
        res.status(200).json({ users: userCount });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user count", error: error.message });
    }
}


module.exports = {
    user,
    login,
    home,
    authenticateToken,
    getAllUsers,
    toggleBlockUser,
    getUserCount
};
