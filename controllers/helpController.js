

// ✅ Submit a help message (Only for logged-in users)
const Help = require("../models/helpModel");

// ✅ Submit a help message (Only for logged-in users)
async function submitHelpMessage(req, res) {
    try {
        console.log("🟢 Request received:", req.body);
        console.log("🟢 Token Payload:", req.user); 

        if (!req.user) {
            console.log("🔴 No user data in request.");
            return res.status(401).json({ message: "Unauthorized: Please log in to submit a message." });
        }

        const userId = req.user?._id || req.user?.userId; 
        console.log("🟢 Extracted userId:", userId);

        if (!userId) {
            console.log("🔴 No user ID found in token.");
            return res.status(401).json({ message: "Unauthorized: No user ID found in token." });
        }

        const { message } = req.body;
        if (!message) {
            console.log("🔴 Message is missing.");
            return res.status(400).json({ message: "Message is required" });
        }

        const newHelpMessage = new Help({ userId, message });
        await newHelpMessage.save();

        console.log("✅ Message saved in DB:", newHelpMessage); // 👀 Check if it logs the message
        res.status(201).json({ message: "Message submitted successfully", data: newHelpMessage });

    } catch (error) {
        console.error("🔴 Server error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


// ✅ Fetch all help messages (Admin only)
async function getHelpMessages(req, res) {
    try {
        console.log("🟢 Admin request received");

        // Ensure the user is authenticated
        if (!req.user) {
            console.log("🔴 Access denied: No user logged in");
            return res.status(401).json({ message: "Unauthorized: Please log in." });
        }

        // Ensure the user is an admin
        if (!req.user.isAdmin) {
            console.log("🔴 Access denied: Not an admin", req.user);
            return res.status(403).json({ message: "Access denied: Admins only." });
        }

        // Fetch messages and populate user details
        const messages = await Help.find()
            .populate("userId", "name email") // ✅ Populate user details
            .sort({ createdAt: -1 });

        if (messages.length === 0) {
            console.log("🟡 No help messages found.");
            return res.status(200).json({ message: "No help messages available." });
        }

        console.log("✅ Retrieved messages from DB:", messages); // 👀 Check logs
        res.status(200).json(messages);
        
    } catch (error) {
        console.error("🔴 Error fetching help messages:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { submitHelpMessage, getHelpMessages };
